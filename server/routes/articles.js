const { Article } = require("../models/article");
const router = require("express").Router();

router.get("/list/", async (req, res) => {
	try {
		res
			.send({
				articles: await Article.find({}),
			});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;