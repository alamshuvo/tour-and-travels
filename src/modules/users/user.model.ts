/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose'
import IUser from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'please provide your name'],
    minlength: 3,
    maxlength: 50,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    immutable: true,
    // validate:{
    //     validator:function(value){
    //         return /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value)
    //     },
    //     message:"{VALUE} is not a valid email"
    // }
  },
  password: {
    type: String,
    required: [true, 'please provide your password'],
    select: false,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'please enter your role'],
    enum: {
      values: ['user', 'admin'],
      message: `{VALUE} is not a valid please provide a valid role`,
    },
    default: 'user',
  },
  userStatus: {
    type: String,
    required: [true, 'please enter your status'],
    enum: {
      values: ['active', 'inactive'],
      message: `{VALUE}is not a valid, please provide a valid user status`,
    },
    default: 'active',
  },
})

// userSchema.pre('find',function(this,next){
//   this.find({userStatus:{$eq:'inactive'}})
// next();
// })

// userSchema.post('find', function (docs,next){

// docs.forEach((doc:IUser) => {
// doc.name = doc.name.toUpperCase()

// });
// next();

// })

userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user?.password,
    Number(config.bcrypt_salt_round)
  )
  next()
})

userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

const User = model<IUser>('User', userSchema)
export default User
