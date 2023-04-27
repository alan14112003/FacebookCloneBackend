import mongoose from 'mongoose'

import SoftDelete from '../../config/SoftDelete'
import userGenderEnum from '../Enums/Users/UserGenderEnum'
import userRoleEnum from '../Enums/Users/UserRoleEnum'
import userStatusEnum from '../Enums/Users/UserStatusEnum'

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    birthdate: Date,
    password: String,
    gender: {
      type: Number,
      enum: Object.keys(userGenderEnum.allName()).map((k) => Number(k)),
      default: userGenderEnum.SECRET,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: Number,
      enum: Object.keys(userRoleEnum.allName()).map((k) => Number(k)),
      default: userRoleEnum.USER,
    },
    hobbies: [
      {
        type: 'ObjectId',
        ref: 'Hobby',
      },
    ],
    avatar: {
      type: String,
      default:
        'https://ik.imagekit.io/alan/images/facebook_clone/143086968_2856368904622192_1959732218791162458_n.png?updatedAt=1680950589015',
    },
    cover_image: String,
    status: {
      type: Number,
      enum: Object.keys(userStatusEnum.allName()).map((k) => Number(k)),
      default: userStatusEnum.UNCONFIRMED,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

userSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`
})

userSchema.plugin(SoftDelete, {
  overrideMethods: 'all',
  deleted_by: true,
  deleted_at: true,
})

export default mongoose.model('User', userSchema)
