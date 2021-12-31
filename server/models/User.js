const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	firstName: { type: String, required: true, minlength: 2 },
	lastName: { type: String, required: true, minlength: 2 },
	role: {
		type: String,
		required: true,
		default: "user",
		enum: ["user", "admin"],
	},
});

module.exports = mongoose.model("User", UserSchema);
