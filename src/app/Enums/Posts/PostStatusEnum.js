class PostStatusEnum {
  static ONLY_ME = 0
  static FRIENDS = 1
  static PUBLIC = 2

  static allName() {
    return {
      [this.ONLY_ME]: 'chỉ mình tôi',
      [this.FRIENDS]: 'bạn bè',
      [this.PUBLIC]: 'công khai',
    }
  }

  static getNameByValue(value) {
    return this.allName()[value]
  }
}

export default PostStatusEnum
