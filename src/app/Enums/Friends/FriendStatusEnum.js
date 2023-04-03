class FriendStatusEnum {
  static REQUEST = 0
  static FOLLOW = 1
  static CONNECT = 2
  static BEST = 3
  static FAVOURITE = 4

  static allName() {
    return {
      [this.REQUEST]: 'yêu cầu',
      [this.FOLLOW]: 'theo dõi',
      [this.CONNECT]: 'bạn bè',
      [this.BEST]: 'bạn thân',
      [this.FAVOURITE]: 'yêu thích',
    }
  }

  static getNameByValue(value) {
    return this.allName()[value]
  }
}

export default FriendStatusEnum
