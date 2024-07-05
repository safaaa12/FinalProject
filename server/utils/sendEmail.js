const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			service: "gmail",
			port: 465,
			secure: true,
			auth: {
				user: "shop82872@gmail.com",
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: "shop82872@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");

		console.log(error);
		return error;
	}
};