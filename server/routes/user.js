const router = require("express").Router();
const { Article } = require("../models/article");
const { User } = require("../models/user");

router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    let user = await User.findOne({ email });
    user = user.toObject();
    delete user.password;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/id/:id", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/tzunai/toggle", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });
    currentIsTzunai = user.isTzunai;
    user.isTzunai = !currentIsTzunai;
    await user.save();
    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/favorites/update", async (req, res) => {
  try {
    const { id, articleId } = req.body;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });
    const article = await Article.findById(articleId);
    if (!article)
      return res
        .status(404)
        .send({ message: "Article with given ID doesn't exist!" });

    const diff = user.favoriteArticles.includes(articleId) ? -1 : 1;
    user.favoriteArticles = user.favoriteArticles.includes(articleId) ? user.favoriteArticles.replace(` ${articleId}`, "") : user.favoriteArticles + ` ${articleId}`;
    article.heartCount += diff;

    await user.save();
    await article.save();

    res.status(200).send({ message: "Favorite mark toggled", diff: diff });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.post("/favorites/list", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });

    res.status(200).send({ message: "returned favorites", favouriteArticles: user.favoriteArticles.split(" ") });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = router;