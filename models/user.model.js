const mongoose = require('mongoose');
const { isEmail } = require("validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [isEmail, "Please enter a valid email address!"],
    },
    password:{
        type: String,
        required:true
    },
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    face:{
        type:String,
    },
    tokens: [{
        token: {
            type: String, 
            required: true
        }
    }]
});

// Hashing the password
userSchema.pre('save', async function(next) {
    let currentUser = this;
    if(!currentUser.isModified('password')) { 
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        currentUser.password = await bcrypt.hash(currentUser.password, salt);
        return next();
    } catch(error) {
        return next(error);
    }
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET); 
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
} 

userSchema.statics.findByCredentials = async function ( email, password ) {
    const user = await this.findOne({ email });
  
    if(!user) {
        throw new Error('Unable to login');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if(!isMatch) {
        throw new Error('Unable to login');
    }
  
    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;