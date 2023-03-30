import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

// Cấu hình dotenv
dotenv.config()

// tạo app là đường dẫn gốc trong thư mục
const app = express()

// Cấu hình thư mục public cho static
app.use(express.static(path.join(__dirname, 'public')))

// gắn nghe cho app và gán vào server
const server = app.listen(process.env.PORT || 443, () => {
  console.log(`Server đang chạy ở cổng ${process.env.PORT}`)
})
