import { Model, model, Schema } from "mongoose"

const UserSchema = new Schema<User, UserModel>({
    username: {
        type: String,
        required: false
    },
    fullname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
        required: false,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
  
  
  export interface User {
    email: string;
    password?: string;
    username?: string;
    fullname?: string;
    avatar?: string;
  }
  export interface UserModel extends Model<User> {}
  
  // Default export
  export default model<User, UserModel>("User", UserSchema)