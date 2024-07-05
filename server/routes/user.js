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


module.exports = router;