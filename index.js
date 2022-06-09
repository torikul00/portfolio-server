const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.USER}:${process.env.USER_PASS}@cluster0.bcig4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    await client.connect()
    const projectsCollection = client.db('torikul').collection('projects')

    app.get('/projects', async (req, res) => {
        
        const projects = projectsCollection.find()
        const result = await projects.toArray()
        res.send(result)

    })
}
run()


app.get('/', (req, res) => {
    res.send('Portfolio server is running')
})
app.listen(port, () => {
    console.log('srver running on 5000')
})