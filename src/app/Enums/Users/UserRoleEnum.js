class UserRoleEnum {
  static USER = 0
  static CENSOR = 1
  static ADMIN = 2

  static allName() {
    return {
      [this.USER]: 'người dùng',
      [this.CENSOR]: 'kiểm duyệt viên',
      [this.ADMIN]: 'quản trị viên',
    }
  }

  static getNameByValue(value) {
    return this.allName()[value]
  }
}

export default UserRoleEnum
