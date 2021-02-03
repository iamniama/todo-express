const fs = require('fs')
const express = require('express')
app = express()
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
const methodOverride = require('method-override');
const { getCiphers } = require('crypto')
const { render } = require('ejs')
const port = 9999

//middleware
app.use(expressLayouts)
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//handlers for the data files
const getFile = (fileName) =>{
    return JSON.parse(fs.readFileSync(fileName))
}

const writeFile = (fileName, fileData)=> {
    fs.writeFileSync(fileName, JSON.stringify(fileData))
}

app.get("/", (req,res)=>{
    let tasks = getFile("./tasks.json")
    tasks = tasks.filter(function(task) {
        return task.done === false
    })
    res.render("todo/show", {data: tasks})
})

app.get("/categories", (req,res)=>{
    let cats = getFile("./categories.json")
    res.render("todo/show_cat", {data: cats})
})

app.get("/tasks/done", (req,res)=>{
    let cats = getFile("./categories.json")
    let tasks = getFile("./tasks.json")
    tasks = tasks.filter(function(task) {
        return task.done === true
    })
    res.render("todo/show", {data: tasks})

})

app.get("/tasks/new", (req,res)=>{
    let cats = getFile("./categories.json")
    res.render("todo/add")
})



app.listen(port)