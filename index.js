//instantiate express module 
const express = require('express')
require('dotenv').config()

//get routes to the variabel 
const router = require('./src/routes')

//use express in aoo variable
const app = express()

//define the server port
const port = 5011

//create app.use for express.json 
app.use(express.json())

//create endpoint grouping and router
app.use('/api/v1/', router)

app.use('/uploads', express.static('uploads'))

//get list route
//app.get('/todos', (req, res)=>{
//    res.send({data: todos})
//})

//get detail route
//app.get('/todo/:id', (req, res)=>{
//    const {id} = req.params

//    let data = todos.find((item) => item.id == id)

//    if(!data){
//        return res.send({
//            status: 'failed',
//            message: 'data not found'
//        })
//    }

//    res.send(data)

    //const index = id
    //res.send(todos[index])
//})

//post route
//app.post('/todo', (req, res)=>{
//    const data = req.body

//    todos.push(data)
//    res.send(todos)
//})

//patch route
//app.patch('/todo/:id', (req, res)=>{
//    const {id} = req.params

//    todos = todos.map(item=>{
//        if(item.id == id){
//            return {...req.body}
//        }else{
//            return item
//        }
//    })

//    res.send({ data: todos })
//})

//Delete route
//app.delete('/todo/:id', (req, res)=>{
//    const {id} = req.params

//    todos = todos.filter((item) => item.id != id)
//    res.send({data: todos})
//})

//create listen
app.listen(port, () => console.log(`Listening on port ${port}`))