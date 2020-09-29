import e from "express";
import express from "express";
import mongoose from "mongoose"
import Messages from "./dbMessage.js"
import cors from 'cors'

import Pusher from "pusher";

// config
const app = express();
const port = process.env.PORT || 9000


const pusher = new Pusher({
    appId: '1081996',
    key: '63391a795cb88aa2ea11',
    secret: '3c1f276c4ca34685d816',
    cluster: 'eu',
    encrypted: true
  })

// middleware
app.use(express.json())
app.use(cors())

// DB Config
const connection_url = 'mongodb+srv://admin:uYqFyQ34242yc2ol@cluster0.ewsq0.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_url);

mongoose.connect(connection_url, {
    userCreateIndex: true,
    useNewUrlParser: true,
    userUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                reveived: messageDetails.received
            });
        } else {
            console.log("Error triggering Pusher");
        }
    });
})

// APIs
app.get("/", (req,res) => res.status(200).send("Hello World!!!"));

// Get message
app.get("/messages/sync", (req, res) => {
    Messages.find((err,data) => {
        if(err) {
            res.status(500).send(data);
        } else {
            res.status(200).send(data);
        }
    })
})

// Send a message
app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

// Listening
app.listen(port,() => console.log(`Listening on localhost:${port}`) );

