const express = require("express");
const Comment = require("../models/Comment");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();


router.post("/articles/:artid", verifyJWT, (req, res) => {
    const newcomm = req.body;
    const artid = parseInt(req.params.artid);

    newcomm.authorId = parseInt(req.user.id);
    newcomm.articleId = artid;

    Comment.create(newcomm).then((comment) => 
    res.status(201).json(comment));
  }); 

router.get("/articles/:id/comments/:id",verifyJWT, (req, res) => {
    const id = parseInt(req.params.id);
   Comments.findByPk(id)
    .then((comment) => res.json(comment));
});

router.get("/articles/:id/comments/", verifyJWT, (req, res) => {
    const criteria = req.query;
    Comments.findAll({
      where: query
    }).then((comment) => res.json(comment));
}); 


router.delete("/articles/:id/comment/:id",verifyJWT, (req, res) => {
    const id = parseInt(req.params.id);
    if (user.isAdmin === true || userId == authorId){
      Comment.destroy({
          where: {
              id: id,
              deletedAt: new Date().getTime(),
          },
      }).then((nbDeleted) => {
          if (!nbDeleted) res.sendStatus(404);
          else res.sendStatus(204);
      });
    }
    else res.sendStatus(404);
});
router.delete("/articles/:id/comment/:id", verifyJWT,(req, res) => {
    const id = parseInt(req.params.id);
    const user = req.user;
    let autId;
    Comment.findByPk(id).then(article => {
      if(!comment)
      {res.sendStatus (404)}
      else
      {
      autId = comment.authorId;
      if (user.isAdmin == true || user.id == autId){
      Comment.destroy({
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


router.put("/articles/:id/comments",verifyJWT, (req, res) => {
    const id = parseInt(req.params.id);
    const user = req.user;
    let autId;
    Comment.findByPk(id).then(comment => {
        if(!comment)
        {res.sendStatus (404)}
        else
        {
        autId = comment.authorId;
        if (user.isAdmin == true || user.id == autId){
        Comment.update(req.body, {
            where: {
                id: id,
            }
        }).then(([nbUpdated]) => {
            if (!nbUpdated) res.sendStatus(404);
            else modArt.findByPk(id).then((user) => res.json(user));
            });
    }
    else res.sendStatus(404);}

  }).catch(err => console.error(err));
});

module.exports = router;