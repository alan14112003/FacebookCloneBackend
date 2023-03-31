class UserStatusEnum {
  static UNCONFIRMED = 0
  static CONFIRMED = 1

  static allName() {
    return {
      [this.UNCONFIRMED]: 'chưa xác thực',
      [this.CONFIRMED]: 'đã xác thực',
    }
  }

  static getNameByValue(value) {
    return this.allName()[value]
  }
}

export default UserStatusEnum
