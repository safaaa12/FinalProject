const router = require("express").Router();
const { Content } = require("../models/content");
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
    const { id, contentId } = req.body;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });
    const content = await Content.findById(contentId);
    if (!content)
      return res
        .status(404)
        .send({ message: "content with given ID doesn't exist!" });

    const diff = user.favoriteContents.includes(contentId) ? -1 : 1;
    user.favoriteContents = user.favoriteContents.includes(contentId) ? user.favoriteContents.replace(` ${contentId}`, "") : user.favoriteContents + ` ${contentId}`;
    content.heartCount += diff;

    await user.save();
    await content.save();

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

    res.status(200).send({ message: "returned favorites", favouriteContents: user.favoriteContents.split(" ") });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.post("/basket/list", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });

    res.status(200).send({ message: "added basket", baskets: user.baskets });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.post("/basket/add", async (req, res) => {
  try {
    const { id, basket } = req.body;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });

    user.baskets.push(basket);
    await user.save();

    res.status(200).send({ message: "added basket" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.post("/basket/update", async (req, res) => {
  try {
    const { id, basket, basketId } = req.body;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });

    let updatedBasket = false;
    let baskets = user.baskets;
    for (let i = 0; i < baskets.length; i++) {
      if (baskets[i]._id == basketId) {
        baskets[i] = basket;
        updatedBasket = true;
        break;
      }
    }

    if (!updatedBasket) {
      return res
        .status(404)
        .send({ message: "Basket with given ID doesn't exist!" });
    } else {
      user.baskets = baskets;
      await user.save();
      return res.status(200).send({ message: "Basket updated" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.post("/basket/delete", async (req, res) => {
  try {
    const { id, basketIndex } = req.body;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });

    if (basketIndex >= 0 && basketIndex < user.baskets.length) {
      user.baskets.splice(basketIndex, 1);
      await user.save();
      return res.status(200).send({ message: "removed basket" });
    } else {
      return res
        .status(404)
        .send({ message: "Basket with given ID doesn't exist!", basketIndex: basketIndex });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send('User not found');
      res.send({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).send(error);
  }
});
router.post('/admin/toggle', async (req, res) => {
  try {
      const user = await User.findById(req.body.id);
      if (!user) return res.status(404).send('User not found');
      user.isAdmin = !user.isAdmin;
      await user.save();
      res.send(user);
  } catch (error) {
      res.status(500).send(error);
  }
});
module.exports = router;