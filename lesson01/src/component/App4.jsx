//Day1_07 : TimeTableH 의 부모컴포넌트
//          자식 컴포넌트 TimeTableH 에게 2개의 배열을 전달해야 함.
//          index.js 에 import 하기

import TimeTableH from './TimeTableH'

export default function App() {
  const time = ['09:00', '11:00', '12:30', '14:00', '16:45']
  const todo = ['수업', '과제', '점심식사', '주간회의', '자료조사']

  return (
    <div>
      <TimeTableH time={time} todo={todo} title={'첫번째 테이블'} />
      {/* <TimeTableH time={time} todo={todo} title={'두번째 테이블'} /> */}
    </div>
  )
}
