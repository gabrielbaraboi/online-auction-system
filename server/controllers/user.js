const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
	try {
		const { email, firstName, lastName, password } = req.body;
		const role = "user";

		if (!(email && firstName && lastName && password)) {
			res.status(400).json({ message: "All inputs are required!" });
		}

		if (await isEmailAlreadyUsed(email))
			return res.status(400).json({ message: "Email already used!" });

		await User.create({
			email: email.toLowerCase(),
			firstName,
			lastName,
			password: await encryptPass(password),
			role,
		});
        res.status(200).json({ message: "User created successfully!" });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Register failed!" });
	}
};

const loginUser = async (req, res) => {
	try {
		let responseUser;
		const { email, password } = req.body;

		if (!(email && password)) {
			res.status(400).json({ message: "All inputs are required!" });
		}

		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			responseUser = {
				id: user._id,
				email: user.email,
				role: user.role,
			};
			responseUser.firstName = user.firstName;
			responseUser.lastName = user.lastName;

			responseUser.accessToken = generateToken(responseUser);
			res.status(200).json({ user: responseUser });
		} else {
			res.status(400).json({ message: "Invalid email or password!" });
		}
	} catch (err) {
		console.log(err);
	}
};

async function encryptPass(pass) {
	encryptedPassword = await bcrypt.hash(pass, 10);
	return encryptedPassword;
}

function generateToken(accType) {
	const token = jwt.sign({ _id: accType.id }, process.env.TOKEN_KEY, {
		expiresIn: 86400,
	});
	return token;
}

async function isEmailAlreadyUsed(email) {
	const user = await User.findOne({ email });
	if (user) return true;

	return false;
}

module.exports = {
	registerUser,
	loginUser,
};
