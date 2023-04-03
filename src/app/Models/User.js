import mongoose from 'mongoose'

import SoftDelete from '../../config/SoftDelete'
import UserGenderEnum from '../Enums/Users/UserGenderEnum'
import UserRoleEnum from '../Enums/Users/UserRoleEnum'
import UserStatusEnum from '../Enums/Users/UserStatusEnum'

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    birthdate: Date,
    gender: {
      type: Number,
      enum: Object.keys(UserGenderEnum.allName()).map((k) => Number(k)),
      default: UserGenderEnum.SECRET,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: Number,
      enum: Object.keys(UserRoleEnum.allName()).map((k) => Number(k)),
      default: UserRoleEnum.USER,
    },
    hobbies: [
      {
        type: 'ObjectId',
        ref: 'Hobby',
      },
    ],
    avatar: String,
    cover_image: String,
    status: {
      type: Number,
      enum: Object.keys(UserStatusEnum.allName()).map((k) => Number(k)),
      default: UserStatusEnum.UNCONFIRMED,
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
