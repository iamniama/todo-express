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
        return parseInt(task.done) == 0 //return task.done === false || task.done == "false"
    })
    res.render("todo/show", {data: tasks})
})

app.get("/categories", (req,res)=>{
    res.render("todo/show_cat", {data: getFile("./categories.json")})
})

app.get("/tasks/done", (req,res)=>{
    //let cats = getFile("./categories.json")
    let tasks = getFile("./tasks.json")
    tasks = tasks.filter(function(task) {
        return parseInt(task.done) == 1  // task.done === true|| task.done == "true"
    })
    res.render("todo/show", {data: tasks})

})

app.get("/tasks/new", (req,res)=>{ 
    res.render("todo/add", {tsk_cats: getFile("./categories.json")})
})

app.post("/tasks", (req,res)=>{
    let tasks = getFile("./tasks.json")
    console.log(req.body)
    console.log("+++++++++++++++++++++++++")

    tasks.push(req.body)
    writeFile("./tasks.json", tasks)
    res.redirect("/")
})



app.listen(port)