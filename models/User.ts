import mongoose, { Schema, model, models } from "mongoose"; //We extract Schema, model, models from mongoose so we do not have to write every time mongoose.Schema or mongoose.model.... 
import bcrypt from "bcryptjs";

export interface IUser {//Here we define interface bcs we are using ts for type safety
    email: string;
    password: string
    username?: string;
    _id?: mongoose.Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

//Now we define a user schema which follow above interface
const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        username: { type: String },
    },
    { timestamps: true }
)

//Now we apply a pre hook on user Schema so that if password is modified then it hash it and save 
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) { //here this is a global object which contains all above variables
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

// Fix for Next.js hot reloading - ensure fresh model with pre-save hook
if (models?.User) {
    // Delete the existing model to ensure fresh registration with hooks
    delete models.User;
}

const User = model<IUser>("User", userSchema);

export default User;