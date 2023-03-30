import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import connections from './config/database'

// Cấu hình dotenv
dotenv.config()

// kết nối tới DB của mongo
connections.MongoDB()

// tạo app là đường dẫn gốc trong thư mục
const app = express()

// Cấu hình thư mục public cho static
app.use(express.static(path.join(__dirname, 'public')))

// gắn nghe cho app và gán vào server
const server = app.listen(process.env.PORT || 80, () => {
  console.log(`Server đang chạy ở cổng ${process.env.PORT}`)
})
