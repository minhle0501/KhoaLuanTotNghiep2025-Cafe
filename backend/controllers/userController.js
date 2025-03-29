import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Đăng ký người dùng
const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    userModel.findOne({ email })
        .then(exists => {
            if (exists) {
                return res.json({ success: false, message: "User already exists" });
            }

            if (!validator.isEmail(email)) {
                return res.json({ success: false, message: "Please enter a valid email" });
            }

            if (password.length < 8) {
                return res.json({ success: false, message: "Please enter a strong password" });
            }

            return bcrypt.genSalt(10);
        })
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
            const newUser = new userModel({ name, email, password: hashedPassword });
            return newUser.save();
        })
        .then(user => {
            const token = createToken(user._id);
            res.json({ success: true, token });
        })
        .catch(err => {
            console.error(err);
            res.json({ success: false, message: err.message });
        });
};

// Đăng nhập người dùng
const loginUser = (req, res) => {
    const { email, password } = req.body;

    userModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.json({ success: false, message: "User doesn't exist" });
            }

            return bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const token = createToken(user._id);
                        res.json({ success: true, token });
                    } else {
                        res.json({ success: false, message: "Invalid credentials" });
                    }
                });
        })
        .catch(err => {
            console.error(err);
            res.json({ success: false, message: err.message });
        });
};

export { loginUser, registerUser };
