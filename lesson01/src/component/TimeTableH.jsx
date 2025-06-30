//Day1_06 : 부모컴포넌트가 자식에게 전달하는 데이터(프로퍼티) 연습

export default function TimeTableH({ time, todo }) {
  return (
    <div>
      <h3>오늘의 시간표</h3>
      <table>
        <tr>
          <th>TIME</th>
          {/* time 배열의 값들로 td 태그 요소 만들기 */}
        </tr>
        <tr>
          <th>TODO</th>
          {/* todo 배열의 값들로 td 태그 요소 만들기 */}
        </tr>
      </table>
    </div>
  )
}
