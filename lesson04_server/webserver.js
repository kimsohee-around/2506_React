import express, { json } from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'

// 웹프레임워크(서버) 실행을 위한 객체 생성
const app = express()
const PORT = 5000

app.use(cors())   // 프론트엔드 백엔드접속에 필요
app.use(json())   // 클라이언트가 보낸 데이터를 수신

// db서버의 주소
const MONGODB_URI = 'mongodb://localhost:27017/'
const DB_NAME = 'react01'
const COLLECTION_NAME = 'lesson04'

// db연결
let db
MongoClient.connect(MONGODB_URI)
  .then((client) => {
    db = client.db(DB_NAME);
    console.log('MongoDB 연결 성공!!!')
    // console.log('db:', db)   // 서버 설정 정보 출력
  })
  .catch((error) => console.error('MongoDB 연결 실패:', error))
