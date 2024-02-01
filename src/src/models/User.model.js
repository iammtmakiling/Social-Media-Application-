import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    firstName:  {
        type: String,
        required: [true, "Please put a First Name."],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please put a Last Name."],
        trim: true
    },
    email : {
        type: String,
        unique: [true, "Email already taken"],
        validate: {
            validator: validator.isEmail,
        },
        required: [true, "Please provide an email."],
        trim: true
    },
    password :  {
        type: String,
        required: [true, "Please provide a password."],
        trim: true,
        select : false
    },
    friends : {
        type : Array,
        items: {dropDups: true},
        default: [],
        uniqueItems: true,
    },
    friendRequest : {
        type : Array,
        items: {dropDups: true},
        default: [],
        uniqueItems: true,
    },
    pendingRequest:{
        type : Array,
        items: {dropDups: true},
        default: [],
        uniqueItems: true,
    },
    name : {
        type : String, 
        minlength: 1,
    }
});

UserSchema.pre('save', async function(){
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt);
})

UserSchema.pre('save', async function(){
    if (!this.isModified('firstName') && !this.isModified ('lastNme')) return;

    this.name = `${this.firstName} ${this.lastName}`;
})

//Compare if the passwords inputed match for verification
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

export default mongoose.model('User', UserSchema);