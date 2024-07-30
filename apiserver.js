import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let blogs = [
    {
        id: 1,
        title: "Endagerment of White tigers",
        blog: "White tigers, known for their striking beauty, face endangerment primarily due to human activities. These majestic creatures, a rare variant of the Bengal tiger, possess a genetic mutation that results in their distinctive white fur. While they have captivated human fascination, their survival in the wild is precarious. One significant factor contributing to their endangerment is habitat loss. Rapid deforestation and urban expansion have severely reduced the natural habitats of tigers, pushing them into smaller, fragmented areas. This not only limits their hunting grounds but also increases human-wildlife conflicts. Additionally, poaching poses a grave threat. White tigers are targeted for their unique pelts and body parts, which are highly valued in illegal wildlife trade.",
        author: "Aditya",
        date: "2023-08-01T10:00:00Z"
    },
    {
        id: 2,
        title: "Endagerment of White tigers",
        blog: "White tigers, known for their striking beauty, face endangerment primarily due to human activities. These majestic creatures, a rare variant of the Bengal tiger, possess a genetic mutation that results in their distinctive white fur. While they have captivated human fascination, their survival in the wild is precarious. One significant factor contributing to their endangerment is habitat loss. Rapid deforestation and urban expansion have severely reduced the natural habitats of tigers, pushing them into smaller, fragmented areas. This not only limits their hunting grounds but also increases human-wildlife conflicts. Additionally, poaching poses a grave threat. White tigers are targeted for their unique pelts and body parts, which are highly valued in illegal wildlife trade.",
        author: "Aditya",
        date: "2023-08-01T10:00:00Z"
    },
    {
        id: 3,
        title: "Endagerment of White tigers",
        blog: "White tigers, known for their striking beauty, face endangerment primarily due to human activities. These majestic creatures, a rare variant of the Bengal tigerskjbfskhbvsduvjgshbjashvb adsj agjsv ashvb asvbsh vsjdfhfbv sfvjhsbv  sjbvs dfjfvhbdsdvifkhvbs vjhdfh fvskhfvbsfkhvbd fvjhbdsfvudsjhbv sdfjvhb dfviykdbhf vdjshvb dfvjhsdb vfbh dsfjvhbdsf vsdjfhvbd vjdhvbn , possess a genetic mutation that results in their distinctive white fur. While they have captivated human fascination, their survival in the wild is precarious. One significant factor contributing to their endangerment is habitat loss. Rapid deforestation and urban expansion have severely reduced the natural habitats of tigers, pushing them into smaller, fragmented areas. This not only limits their hunting grounds but also increases human-wildlife conflicts. Additionally, poaching poses a grave threat. White tigers are targeted for their unique pelts and body parts, which are highly valued in illegal wildlife trade.",
        author: "Aditya",
        date: "2023-08-01T10:00:00Z"
    }
]

let lastId = 3;

app.get("/blogs", (req,res)=> {
    console.log(blogs)
    res.json(blogs)
})

app.post("/new", (req,res)=> {
    const id = lastId+=1;
    const blog = {
        id: id,
        title: req.body.title,
        blog: req.body.blog,
        author: req.body.author,
        date: new Date(),
    }
    lastId= id;
    blogs.push(blog);
    res.json(blog)
})

app.get("/edit/:id", (req,res)=> {
    const id = parseInt(req.params.id)
    console.log(id)
    const blog = blogs.find((post) => post.id === id)
    if (!blog) return res.status(404).json({ message: "Post not found" });
    res.json(blog)
})

app.patch("/modify/:id", (req,res)=> {
    const id = parseInt(req.params.id)
    const response = blogs.find((blog)=> blog.id === id)
    const blog = {
        id: id,
        title: req.body.title || response.title,
        blog: req.body.blog || response.blog,
        author: req.body.author || response.author,
        date: new Date(),
    }
    const blogindex = blogs.findIndex((blog)=> blog.id === id)
    blogs[blogindex] = blog
    res.json()
})

app.delete("/delete/:id", (req,res)=> {
    const id = parseInt(req.params.id)
    const blogindex = blogs.findIndex((blog)=> blog.id === id)
    if (blogindex === -1) return res.json({message: "Couldn't delete post"})
    console.log(blogindex)
    blogs.splice(blogindex, 1)
    res.json({ message: "Post deleted" })
})

app.delete("/deleteall", (req,res)=> {
    blogs = [];
    res.json(blogs)
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})