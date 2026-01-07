const express = require("express");
const { userInfo } = require("os");
const app = express();
const port = 8080;

const {v4: uuidv4} = require("uuid");

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let posts = [
    {
        id: uuidv4(),
        username: "Sankalp",
        content: "Hello, It's my page"
    }, 
    {
        id: uuidv4(),
        username: "Random",
        content: "Happy new year"
    },
    {
        id: uuidv4(),
        username: "Soham",
        content: "Hello Everyone"
    }
]

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
})

app.get('/posts', (req, res) => {
    res.render("index.ejs", {posts});
})

app.get('/posts/new', (req, res) => {
    res.render("form.ejs");
})

app.post('/posts', (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({username, content, id});
    res.redirect('/posts');
})

app.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("post.ejs", {post});
})