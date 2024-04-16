const mongoose = require("mongoose");
const emailTemplate = require("../mail/emailVerificationTemplate");

const Otp = new mongoose.Schema({
    email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:`smtp.gmail.com`,
                auth:{
                    user: `bhaiyarohit2301@gmail.com`,
                    pass: `neby kebu tnnb uekf`,
                }
            })


            let info = await transporter.sendMail({
                from: 'EXPENSE MANAGEMENT - by Rohit',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}




async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp),
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

Otp.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});



const OTP = mongoose.model("OTP", Otp);

module.exports = OTP;