import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";
import crypto from "crypto";

// Tạo token JWT
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

            // Tạo salt và băm mật khẩu
            return bcrypt.genSalt(10);
        })
        .then(salt => bcrypt.hash(password, salt))  // Băm mật khẩu
        .then(hashedPassword => {
            const newUser = new userModel({ name, email, password: hashedPassword });
            return newUser.save();  // Lưu người dùng vào cơ sở dữ liệu
        })
        .then(user => {
            const token = createToken(user._id);  // Tạo token cho người dùng
            res.json({ success: true, token });  // Trả về token
        })
        .catch(err => {
            console.error(err);
            res.json({ success: false, message: err.message });  // Xử lý lỗi
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

            return bcrypt.compare(password, user.password)  // Kiểm tra mật khẩu
                .then(isMatch => {
                    if (isMatch) {
                        const token = createToken(user._id);
                        res.json({ success: true, token });  // Trả về token nếu mật khẩu đúng
                    } else {
                        res.json({ success: false, message: "Invalid credentials" });  // Mật khẩu sai
                    }
                });
        })
        .catch(err => {
            console.error(err);
            res.json({ success: false, message: err.message });
        });
};

// Cấu hình transporter cho nodemailer (sử dụng Gmail SMTP trong ví dụ này)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

const forgotPassword = (req, res) => {
    const { email } = req.body;

    // Kiểm tra email hợp lệ
    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Tìm người dùng
    userModel.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.json({ success: false, message: "User not found" });
            }

            // Tạo mã reset mật khẩu (token)
            const resetToken = crypto.randomBytes(32).toString("hex");
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ hết hạn

            return user.save();
        })
        .then((user) => {
            // Tạo URL reset mật khẩu
            const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${user.resetPasswordToken}`;

            // Gửi email với link reset mật khẩu
            const mailOptions = {
                to: email,
                from: process.env.GMAIL_USER,
                subject: "Password Reset Request",
                text: `You have requested to reset your password. Please click the following link to reset your password: ${resetUrl}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    // Nếu có lỗi trong khi gửi email, tránh gửi phản hồi lại lần nữa
                    return res.status(500).json({ success: false, message: "Error sending email" });
                }
                return res.json({ success: true, message: "Password reset link sent to your email" });
            });
        })
        .catch((err) => {
            // Kiểm tra lỗi bất đồng bộ và chỉ gửi một lần phản hồi
            console.error(err);
            if (!res.headersSent) {  // Kiểm tra xem có phản hồi chưa
                return res.status(500).json({ success: false, message: err.message });
            }
        });
};

// Reset password
const resetPassword = (req, res) => {
    const { token, newPassword } = req.body;

    userModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
        .then((user) => {
            if (!user) {
                return res.json({ success: false, message: "Invalid or expired reset token" });
            }

            return bcrypt.genSalt(10);  // Tạo salt cho mật khẩu mới
        })
        .then((salt) => {
            return bcrypt.hash(newPassword, salt);  // Băm mật khẩu mới
        })
        .then((hashedPassword) => {
            return userModel.findOneAndUpdate(
                { resetPasswordToken: token },
                {
                    password: hashedPassword,
                    resetPasswordToken: undefined, // Xóa token reset
                    resetPasswordExpires: undefined // Xóa thời gian hết hạn
                },
                { new: true }
            );
        })
        .then(() => {
            return res.json({ success: true, message: "Password updated successfully" });
        })
        .catch((err) => {
            console.error(err);
            return res.json({ success: false, message: err.message });
        });
};

export { loginUser, registerUser, forgotPassword, resetPassword };
