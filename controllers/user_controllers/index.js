const { JOI_Validations } = require("../../services/joi_services");
const { Bcrypt_Service } = require("../../services/bcrypt_services");
const { User_Auth_Schema } = require("../../models/user_auth_model");
const User_DTO = require("../../dto/user_dto");
const { JWT_Generate_Token_Handle } = require("../../services/jwt_services");
const Auth_Token_DTO = require("../../dto/auth_tokens_dto");
const { User_Tokens_Schema } = require("../../models/user_tokens_model");
const { generateOtp } = require("../../utils/generate_OTP");
const {
    register_user,
} = require("../../utils/email_transport_config");
const verifyEmailSchema = require("../../models/verification/verifyEmailTokenSchema");

const update_parent = async (req, res, next) => {

    const { body , user_id} = req;
    const {first_name,last_name,email,number,dob,gender,card_holder_name,card_number,expiry_date,cvv} = body;
    console.log('user id',user_id);
    const finduser = await User_Auth_Schema.findById({ _id: user_id })
    
    if (finduser) {
        console.log("Find User Test",finduser)
        try {
            if(first_name)
                {
                    finduser.first_name = first_name;
                }
                if(last_name)
                {
                    finduser.last_name = last_name;
                }
                if(email)
                {
                    finduser.email = email;
                }
                if(number)
                {
                    finduser.number = number;
                }
                if(dob)
                {
                    finduser.dob = dob;
                }
                if(gender)
                {
                    finduser.gender = gender;
                }
                if(card_holder_name)
                {
                    finduser.card_holder_name = card_holder_name;
                }
                if(card_number)
                {
                    finduser.card_number = card_number;
                }
                if(expiry_date)
                {
                    finduser.expiry_date = expiry_date;
                }
                if(cvv)
                {
                    finduser.cvv = cvv;
                }
                await finduser.save();
                const user_dto = new User_DTO(finduser);
            return res.json({ message: "user Updated successfully",'User':user_dto })
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user', error: error.message });
        }
        
        
    } else {
        return res.status(404).json({ message: "user not found" })
    }

}


module.exports = {

    update_parent

};
