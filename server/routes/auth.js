const router = require("express").Router();
const { User } = require("../models/user");
const locationRoutes = require('./location');
const bcrypt = require("bcrypt");
const Joi = require("joi");
const GEOLOCATION_API_KEY = process.env.GEOLOCATION_API_KEY;
router.post('/login', async (req, res) => {
  try {
    // אם המשתמש קיים כבר במסד הנתונים, עדכן את המיקום שלו
    // אחרת, צור משתמש חדש ושמור את המיקום שלו
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      // אם המשתמש כבר קיים, עדכן את המיקום שלו
      const response = await axios.get(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GEOLOCATION_API_KEY}`);
      const location = response.data.location;
      await User.findByIdAndUpdate(existingUser._id, { location }); 
    } else {
      // אחרת, צור משתמש חדש ושמור את המיקום שלו
      const newUser = new User({
        email: req.body.email,
        password: req.body.password // נאמנה שהסיסמה תתקבל מה-req.body, עליך לוודא אימות והצפנה מתאימים
      });
      const response = await axios.get(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GEOLOCATION_API_KEY}`);
      const location = response.data.location;
      newUser.location = location; // הגדרת המיקום של המשתמש החדש
      await newUser.save();
    }

    res.status(200).json({ success: true, message: 'Location received successfully.' });
  } catch (error) {
    console.error('Error getting location:', error);
    res.status(500).json({ success: false, message: 'Error getting location.' });
  }

});
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid Email" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: { token, isAdmin: user.isAdmin }, message: "logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password"),
  });
  return schema.validate(data);
};

router.get('/', (req, res) => {
  MyModel.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.send(data);
    }
  });
});

module.exports = router;