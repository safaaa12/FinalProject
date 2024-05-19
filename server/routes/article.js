const router = require("express").Router();
const { Article, validate } = require("../models/article");

router.post("/add/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		article = await new Article({ ...req.body }).save();

		res
			.status(201)
			.send({ message: "הכתבה נוצרה" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// router.post("/heart/plus/", async (req, res) => {
// 	try {
// 		const { articleId } = req.body;
// 		const article = await Article.findById(articleId);
// 		if (!article)
// 			return res
// 				.status(404)
// 				.send({ message: "Article with given ID doesn't exist!" });
// 		article.heartCount += 1;
// 		await article.save();
// 		res.status(200).send({ message: "הכתבה קיבלה לב" });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });



module.exports = router;