const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const UserSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true },
        password: { type: String, required: true },
        full_name: { type: String, required: true },
        address: { type: String},
        phone_number: { type: Number,required:true },
        role:{type:String,required:true, default:'User'},
        avatar:{type:String},
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }],
    },
    { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    console.log(user)
    const token = jwt.sign({_id: user._id}, chuoi_ky_tu_bi_mat)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email})
    if (!user) {
        throw new Error({error: 'Invalid login credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({error: 'Invalid login credentials'})
    }
    return user
}


const User =mongoose.model("User", UserSchema);
module.exports = User;