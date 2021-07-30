import mongoose from 'mongoose';

const FIRST_NAME_REQUEST_FIELD = "First Name";
const LAST_NAME_REQUEST_FIELD = "Last Name";
const COUNTRY_REQUEST_FIELD = "Country";
const REFERRED_BY_REQUEST_FIELD = "ReferredBy";

interface IUserRequest {
    [FIRST_NAME_REQUEST_FIELD]: string,
    [LAST_NAME_REQUEST_FIELD]: string,
    [COUNTRY_REQUEST_FIELD]: string,
    email: string,
    dob: string,
    mfa?: string,
    amt: number,
    createdDate: string,
    [REFERRED_BY_REQUEST_FIELD]?: string
}

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
    buildFromRequest(userRequest: IUserRequest): UserDoc;
    buildFromBulkRequest(userRequest: IUserRequest[]): UserDoc[];
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

const userSchema = new mongoose.Schema({
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

userSchema.statics.buildFromRequest = (attr: IUserRequest): UserDoc => {
    const { email, mfa, amt } = attr;
    const firstName = attr[FIRST_NAME_REQUEST_FIELD];
    const lastName = attr[LAST_NAME_REQUEST_FIELD];
    const countryCode = attr[COUNTRY_REQUEST_FIELD];
    const referredBy = attr[REFERRED_BY_REQUEST_FIELD];
    const dob = Date.parse(attr.dob);
    const createdDate = Date.parse(attr.createdDate);

    return new User({ firstName, lastName, countryCode, email, dob, mfa, amt, createdDate, referredBy });
}

userSchema.statics.buildFromBulkRequest = (userRequests: IUserRequest[]): UserDoc[] => {
    const mappedUsers = userRequests.map(user => { 
        console.log(user);
        return User.buildFromRequest(user)
    });
    console.log('mapped users:', mappedUsers);
    return mappedUsers;
}

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema);


export { User, UserDoc }
