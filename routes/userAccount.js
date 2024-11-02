const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userPrisma = require("../PrismaClient");

router.get("/", async (req, res, next) => {
  const user = await userPrisma.user.findMany();

  res.json(user);
});

router.post("/register", async function (req, res) {
  const { name, email, country, password, phone_number, address } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "require name, email and password" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userPrisma.user.create({
    data: {
      name: name,
      email: email,
      password: hash,
      country: country,
      phoneNumber: phone_number,
      address: address,
    },
  });

  res.json(user);
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ msg: "name and password are required" });
  }

  try {
    const user = await userPrisma.user.findFirst({
      where: { name: name },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, name: user.name },
        process.env.JWT_SECRET
      );
      res.json({
        msg: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
        token,
      });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Failed to login", error: error.message });
  }
});

module.exports = router;
