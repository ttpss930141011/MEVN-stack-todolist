// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongo = require('mongodb');
const env = require('dotenv').config();
const MongoClient = mongo.MongoClient;
const uri = `mongodb+srv://${process.env.account}:${process.env.password}@cluster0.bnrz2.mongodb.net/?retryWrites=true&w=majority`;
var client;
var mongoClient = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser : true 
});
mongoClient.connect((err, db) => { // returns db connection
    if (err != null) {
        console.log(err)
        return
    }
    client = db
})
const app = express() // create your express app
// make app use dependencies

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/todo', async(req, res) => {
    const collection = client.db("test").collection("todos");
    try{
        const results = await collection.find().toArray();
        res.send(results);
    }catch(err){
        console.log(err)
        res.send([])
        return
    }
});
app.post('/todo', async(req, res) => {
    const collection = client.db('test').collection('todos')
    var todo = req.body.todo // parse the data from the request's body
    try{
        const results = await collection.insertOne({title: todo});
        const document = await collection.findOne({'_id':results.insertedId});
        res.send(document)
    }catch(err){
        console.log(err)
        res.send('')
        return
    }
})
app.delete('/todo', async(req, res) => {
    const collection = client.db('test').collection('todos')
    var id = req.body.id // parse the data from the request's body
    console.log(id);
    try{
        await collection.deleteOne({_id:mongo.ObjectId(id)});
        const results = await collection.find().toArray();
        res.send(results);
    }catch(err){
        console.log(err)
        res.send('')
        return
    }
});
app.put('/todo', async(req, res) => {
    const collection = client.db('test').collection('todos')
    var id = req.body.id // parse the data from the request's body
    var text = req.body.text;
    try{
        await collection.updateOne({_id:mongo.ObjectId(id)},{$set:{'title':text}});
        const results = await collection.find().toArray();
        console.log(results);
        res.send(results);
    }catch(err){
        console.log(err)
        res.send([])
        return
    }
});

app.listen(process.env.PORT || 8081) // client is already running on 8080