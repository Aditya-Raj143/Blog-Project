import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
var loggedIn = false;
const API = "http://localhost:4000"
const MasterKey = "SNAP"

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static("public"));
var logic = false

let lastId = 3;

app.get("/", (req,res) => {
    // console.log(loggedIn)
    res.render("index.ejs", {loggedIn})
})

app.get("/loginpage", (req,res) => {
    res.render("login.ejs",)
})

app.post("/login", (req,res) => {
    if(req.body["username"] == "adityaraj" && req.body["password"] == "abc") {
        loggedIn = true
        res.redirect("/")
    }
    else { 
        res.render("login.ejs")
    }
    
})

//-- BLOG PAGE --//

//blog page render
app.get("/blogs", async (req,res)=> {
    try {
        const response = await axios.get(`${API}/blogs`)
        logic = false
        res.render("blog.ejs", {blogs: response.data,popup: logic})
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
})

//new post
app.get("/new", async (req,res) => {
    try {
        const response = await axios.post(`${API}/new`,req.body)
        res.redirect("/blogs")
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }

})

//edit page render
app.get("/edit/:id", async (req,res)=>{
    const id = parseInt(req.params.id)
    try {
        const response = await axios.get(`${API}/edit/${id}`)  
        console.log(logic)
        res.render("modify.ejs", {blogs: response.data})      
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    } 
})

//edit changes
app.post("/api/blogs/:id", async (req,res)=> {
    try {
        const response = await axios.patch(`${API}/modify/${parseInt(req.params.id)}`,req.body)
        res.redirect("/blogs")
    } catch (error) {
        res.status(500).json({ message: "Error saving changes" });
    }
})

//delete post
app.get("/delete/:id", async (req,res)=> {
    try {
        const message = await axios.delete(`${API}/delete/${parseInt(req.params.id)}`)
        const response = await axios.get(`${API}/blogs`)
        console.log(message)
        logic = true 
        res.render("blog.ejs", {blogs: response.data,popup: logic})
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
})

//delete all posts
app.get("/deleteall", async (req,res)=> {
    const key  = req.query.key
    console.log(key=="null")
    if (key == MasterKey) {
        try {
            const response = await axios.delete(`${API}/deleteall`)
            res.redirect("/blogs")
        } catch (error) {
            res.status(500).json({message: "Error deleting all the posts"})
        }
    }
    else if (key=="null") { res.redirect("/blogs") }
    else res.status(500).json({message: "Wrong Key"})

})

app.listen(port, ()=> {                                                                              
    console.log(`server running on port ${port}`)
});
