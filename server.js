const articles = require ('./articles.json');
const users = require ('./users.json');
const express = require ('express');
const res = require('express/lib/response');

const app = express();
app.listen(8080,()=>{
    console.log("Server started!")
})

app.get('/articles', (req, res)=>{
    res.json(articles)
})

app.get('/users', (req, res)=>{
    res.json(users)
})

app.get('/user/:id/articles', (req, res)=>{
    const id = parseInt(req.params.id)
    const user = users.find(user=>user.id == id)
    const Articles = articles
        .filter(function(article){
            return article.authorID == id
        })
        .map(function(article){return {
            authorID:user.id,
            lastname:user.lastname,
            firstname:user.firstname,
            title:article.title,
            content:article.content,
            tags:article.tags,
            createdAt:article.createdAt,
            updatedAt:article.updatedAt}})
    res.json
    ({
        Articles
    })
})

app.get('/articles/:id', (req, res)=>{
    const id = parseInt(req.params.id)

    const article = articles.find(article=>article.id == id)
    const user = users.find(user=>user.id===article.authorID)

    res.json
    ({
        authorID:user.id,
        lastname:user.lastname,
        firstname:user.firstname,
        title:article.title,
        content:article.content,
        tags:article.tags,
        createdAt:article.createdAt,
        updatedAt:article.updatedAt
    })
})