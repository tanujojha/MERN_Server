import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: "tanujojha2042@gmail.com",
        pass: "password of this email"
    }
});








