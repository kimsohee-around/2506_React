import express, { json } from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'

// 웹프레임워크(서버) 실행을 위한 객체 생성
const app = express()
const PORT = 5000     // 클라이언트 -> nodejs 백엔드 서버 연결 포트

app.use(cors())   // 프론트엔드 백엔드접속에 필요
app.use(json())   // 클라이언트가 보낸 데이터를 수신

// db서버의 주소
const MONGODB_URI = 'mongodb://localhost:27017/'
const DB_NAME = 'react01'
const COLLECTION_NAME = 'lesson04'

// db연결 : nodejs 서버(백엔드) -> db
let db
MongoClient.connect(MONGODB_URI)
  .then((client) => {
    db = client.db(DB_NAME);
    console.log('MongoDB 연결 성공!!!')
    // console.log('db:', db)   // 서버 설정 정보 출력
  })
  .catch((error) => console.error('MongoDB 연결 실패:', error))

// API 라우팅 메소드 작성하기
app.get("/api/todos", async (req, res) => {
  // 처리할 url : /api/todos    // 콜백함수 인자 req는 요청, res는 응답 정보 저장 객체
  try {
    const todos = await db.collection(COLLECTION_NAME).find({})
      .toArray()
    res.json(todos)   //db에서 조회한 todos 배열을 json 형식 응답으로 보내기                              
  } catch (error) {
    // 오류 발생시 : 서버오류 응답 코드 보내기
    res.status(500).json({ error: "데이터 조회 실패" })
  }
})





// 백엔드 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT} 에서 실행 중 입니다.`)
})