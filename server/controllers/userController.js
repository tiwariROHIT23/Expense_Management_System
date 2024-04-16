const userModel = require("../models/userModel");
const otpGenerator = require("otp-generator");
const OTP = require("../models/Otp");

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({email});
    if (!user) {
      return res.status(404).json({
        success:false,
        message:"User Not Found"
      });
    }
    const check = await userModel.findOne({email,password});
    if(password != check.password){
        return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
    }
    
    res.status(200).json({
      success: true,
      message:"Login successfully !!",
      user
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message:"Login failure please try again",
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const {email} = newUser.email;
    const findEmail = await userModel.findOne({email});
    if(findEmail){
      res.status(400).json({
        success:false,
        message:"User already Exist"
      })
    }

    await newUser.save();
    res.status(201).json({
      success: true,
      message:"Successfully Registered",
      newUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:"user not registered",
      error,
    });
  }
};




// Send OTP For Email Verification
const sendotp = async (req, res) => {
	try {
		const { email } = req.body;

		// Check if user is already present
		// Find user with provided email
		const checkUserPresent = await userModel.findOne({ email });
		// to be used in case of signup
		// If user found with provided email
		if (!checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User not found`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};

// correction

const verifyOtp = async(req,res)=>{
  try{
         const {email,otp} =  req.body;
         const check = await OTP.findOne({email,otp});
         if(!check){
          return res.status(401).json({
            success: false,
            message: `Wrond OTP`,
          });
         }
         return res.status(200).json({
          success: true,
          message: `OTP Correct`,
        });
  }
  catch(error){
    console.log(error.message);
		return res.status(500).json({ success: false, message:"Internal error", error: error.message });
  }

}


const changePassword = async(req,res)=>{
  try{
    const{email,password,confirmPassword} = req.body;
    if(password !== confirmPassword){
      return res.status(400).json({
        success:false,
        message:"Confirm Password Not Match"
      });
    };
    const check =  await userModel.findOneAndUpdate(
      email,
      {password:password},
      {new:true},
    )
    return res.status(200).json({
      success:true,
      message:"Password Updated",
    })


  }catch(error){
    console.log(error.message);
		return res.status(500).json({ success: false, message:"Internal error", error: error.message });
  }
}

module.exports = { loginController, registerController, sendotp, verifyOtp,changePassword};

