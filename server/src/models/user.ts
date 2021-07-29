import mongoose from 'mongoose';

interface IUser {
    firstName: string,
    lastName: string,
    countryCode: string,
    email: string,
    dob: Date,
    mfa: string,
    amt: number,
    createdDate: Date,
    referredBy: string
}

interface UserDoc extends mongoose.Document {
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
    build(user: IUser): UserDoc;
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
    },
    mfa: {
        type: String
    },
    amt: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    referredBy: {
        type: String
    }
});

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema);


export { User }
