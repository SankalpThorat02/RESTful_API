const express = require("express");
const { userInfo } = require("os");
const app = express();
const port = 8080;

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let posts = [
    {
        username: "Sankalp",
        content: "Hello, It's my page"
    }, 
    {
        username: "Random",
        content: "Happy new year"
    },
    {
        username: "Random",
        content: "Happy new year"
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
    posts.push({username, content});
    res.redirect('/posts');
})
