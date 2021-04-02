const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoData = require("./mongoData.js");
const dotenv = require("dotenv");
const Pusher = require("pusher");

//app config
const app = express();
dotenv.config({ path: "config.env" });
const port = process.env.PORT || 8002;

const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: "ap2",
  useTLS: true,
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//db config
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB.."))
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.once("open", () => {
  console.log("DB Connected...");

  const changeStream = mongoose.connection.collection("conversations").watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("channels", "newChannel", {
        change: change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("conversations", "newMessage", {
        change: change,
      });
    } else {
      console.log("Error trigger Pushers");
    }
  });
});

//api routes
app.get("/", (req, res) => res.status(200).send("hello world discord"));

app.post("/new/channel", (req, res) => {
  const dbData = req.body;

  mongoData.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/get/channelList", (req, res) => {
  mongoData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let channels = [];

      data.map((channeData) => {
        const channelInfo = {
          id: channeData._id,
          name: channeData.channelName,
        };
        channels.push(channelInfo);
      });

      res.status(200).send(channels);
    }
  });
});

app.post("/new/message", (req, res) => {
  // console.log(req.body);
  mongoData.update(
    { _id: req.query.id },
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

app.get("/get/conversation", (req, res) => {
  const id = req.query.id;
  mongoData.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
