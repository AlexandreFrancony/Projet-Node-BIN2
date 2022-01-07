const express = require("express");
const modArt = require("../models/Article")
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get('/:id', verifyJWT,(req, res) => {
  const id = parseInt(req.params.id)
  modArt.findByPk(id)
    .then(article => res.status(201).json(article))
});

router.get("", verifyJWT,(req, res) => {
  const query = req.query;
  modArt.findAll({
    where: query
  }).then(article => res.json(article))
});

router.delete("/:id", verifyJWT,(req, res) => {
  const id = parseInt(req.params.id);
  const user = req.user;
  let autId;
  modArt.findByPk(id).then(article => {
    if(!article)
    {res.sendStatus (404)}
    else
    {
    autId = article.authorId;
    if (user.isAdmin == true || user.id == autId){
    modArt.destroy({
        where: {
          id: id,
        },
      }).then((nbDeleted) => {
        if (!nbDeleted) res.sendStatus(404);
        else res.sendStatus(204);
      });
    }
    else { res.sendStatus (401) }}
  }).catch(err => console.error(err));
});


router.post("", verifyJWT, (req, res) => {
  const newarticle = req.body;
  newarticle.authorId = parseInt(req.user.id);
  modArt.create(newarticle).then((article) => 
  res.status(201).json(article));
}); 


router.put("/:id", verifyJWT, (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.user;
  let autId;
  modArt.findByPk(id).then(article => {
    if(!article)
    {res.sendStatus (404)}
    else
    {
    autId = article.authorId;
    if (user.isAdmin == true || user.id == autId){
      modArt.update(req.body, {
      where: {
        id: id,
      },
    }).then(([nbUpdated]) => {
      if (!nbUpdated) res.sendStatus(404);
      else modArt.findByPk(id).then((user) => res.json(user));
    });
  }
  else res.sendStatus(401);}

  }).catch(err => console.error(err));
});

module.exports = router;