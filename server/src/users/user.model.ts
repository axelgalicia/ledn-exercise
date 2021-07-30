import mongoose from 'mongoose';

interface IUser {
    firstName: string,
    lastName: string,
    countryCode: string,
    email: string,
    dob: Date,
    mfa?: string,
    amt: number,
    createdDate: Date,
    referredBy?: string
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
    build(user: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
    firstName: string,
    lastName: string,
    countryCode: string,
    email: string,
    dob: Date,
    mfa?: string,
    amt: number,
    createdDate: Date,
    referredBy?: string
}

const options = { discriminatorKey: 'email' };

const userSchema = new mongoose.Schema<UserDoc, UserModelInterface>({
    firstName: {
        type: String,
        required: true,
        index: true,
    },
    lastName: {
        type: String,
        required: true,
        index: true,
    },
    countryCode: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    mfa: {
        type: String,
        index: true,
    },
    amt: {
        type: Number,
        required: true,
        index: true,
    },
    createdDate: {
        type: Date,
        required: true,
        index: true,
    },
    referredBy: {
        type: String,
    }
}, options);

userSchema.statics.build = (attr: IUser) => {
    return new User(attr);
}


const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema);


export { User, UserDoc }
