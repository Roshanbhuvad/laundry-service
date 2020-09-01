const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../key");
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, JWT_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Forbidden",
    });
  }
};
//const mongoose = require("mongoose");
//const Owner = mongoose.model("Owner");
//const Customer = mongoose.model("Customer");

/*module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    const { _id } = payload;
    Owner.findById(_id).then((userdata) => {
      req.user = userdata;
      const { _id } = payload;
      Customer.findById(_id).then((customerdata) => {
        req.customer = customerdata;
        next();
      });
    });
  });
};
*/
//const mongoose = require("mongoose");
