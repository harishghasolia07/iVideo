import mongoose, { Schema, model, models } from "mongoose"; //We extract Schema, model, models from mongoose so we do not have to write every time mongoose.Schema or mongoose.model.... 
import bcrypt from "bcryptjs";

export interface IUser {//Here we define interface bcs we are using ts for type safety
    email: string;
    password: string
    _id?: mongoose.Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

//Now we define a user schema which follow above interface
const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
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

const User = models?.User || model<IUser>("User", userSchema) //models?.User checks if the model is already defined.If it exists, it reuses the existing model.If it does not exist, it creates a new one using model("User", userSchema)

export default User;