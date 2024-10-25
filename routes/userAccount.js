const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt')

const userPrisma = require('../PrismaClient')

router.get("/", async (req,res, next)=>{
    const user = await userPrisma.user.findMany();

    res.json(user)
})

router.post("/register", async function (req, res) {
	const { name, email, country, password, phone_number, address} = req.body;
	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ msg: "require name, email and password" });
	}

	const hash = await bcrypt.hash(password, 10);

	const user = await userPrisma.user.create({
		data: {
			name: name,
			email: email,
			password: hash,
            country: country,
            phoneNumber: phone_number,
            address: address
		},
	});

	res.json(user);
});

// router.post("/login", async function (req, res) {
// 	const { username, password } = req.body;
// 	if (!username || !password) {
// 		return res.status(400).json({ msg: "require username and password" });
// 	}

// 	const user = await userPrisma.user.findUnique({
// 		where: { username: username },
// 	});

// 	if (user) {
// 		if (await bcrypt.compare(password, user.password)) {
// 			const token = jwt.sign(user, process.env.JWT_SECRET);
//             res.json({ token, user });
// 		}
// 	} else {
// 		res.status(401).json({ msg: "username or password incorrect" });
// 	}
// });



module.exports = router;