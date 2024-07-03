const router = require("express").Router();
const { Recipe, validate } = require("../models/recipe");

router.post("/add/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		article = await new Recipe({ ...req.body }).save();

		res
			.status(201)
			.send({ message: "הכתבה נוצרה" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;