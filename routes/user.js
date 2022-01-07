const express = require("express");
const User = require("../models/User");
const router = express.Router();
const verifyTok = require("../middlewares/verifyJWT");

router.post("", (req, res) => {
  User.create(req.body).then((user) => res.status(201).json(user));
});




router.get("",verifyTok, (req, res) => {
  const criteria = req.query;
  const id = parseInt(req.user.id);
  if (req.user.isAdmin === true){
  User.findAll({
    attributes: { exclude: ['password'] },
    where: criteria
  }).then((users) => res.json(users));console.log("Connecté en tant qu'administrateur")}
  else{
    User.findByPk(id,{attributes: { exclude: ['password'] }}).then((user) => {
      if (!user) res.sendStatus(404);
      else res.json(user);
      console.log("Connecté en tant qu'utilisateur")
    });}
});

router.delete("/:id",verifyTok, (req, res) => {
  const id = parseInt(req.params.id);
  const currentId = parseInt(req.user.id);
  if (req.user.isAdmin === true){
  User.destroy({
    where: {
    id: id
  },
  }).then((nbDeleted) => {
    if (!nbDeleted) res.sendStatus(404);
    else res.sendStatus(204);
  });console.log("L'utilisateur a bien été supprimé")}
  else{
    User.destroy({
      where : {
        id :  currentId
      }
    })
      if (id!=currentId) res.sendStatus(404);
      else res.sendStatus(204);
      console.log("Votre compte a bien été supprimé")
    };
});

router.put("/:id",verifyTok, (req, res) => {
  const id = parseInt(req.params.id);
  const currentId = parseInt(req.user.id);
  if (req.user.isAdmin === true){
  User.update(req.body, {
    where: {
    id: id
  },
  }).then((nbUpdated) => {
    if (!nbUpdated) res.sendStatus(404);
    else User.findByPk(id).then((user) => res.json(user));  });console.log("L'utilisateur a bien été modifié")}
  else{
    User.update(req.body,{
      where : {
        id : currentId
      },
      individualHooks: true
    }).then(([nbUpdated]) => {
      if (!nbUpdated) res.sendStatus(404);
      else User.findByPk(id).then((user) => res.json(user)) });console.log("Votre compte a bien été modifié")
    }
    ;
});



module.exports = router;