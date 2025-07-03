import { useRef, useState } from 'react'

export function FocusInput() {
  // 컴포넌트
  const inputRef = useRef(null)
  // 🔥참조요소의 값이 바뀌어도 재렌더링 안함. nickname 재렌더링할 때 이전 값 유지

  // inputRef 와 비교하기 위해 정의
  const [nickname, setNickname] = useState('') // 🔥 값이 바뀔때, 렌더링 다시함.

  const handleFocus = () => {
    // 이벤트 함수
    inputRef.current.focus() // DOM 요소에 직접 접근(getElementById 동일한 동작)
    // input 요소는 value 를 꼭 써야 합니다.
    inputRef.current.value = '테스트 중입니다.'
  }
  // 🔥 주의 : inputRef 는 DOM 요소가 만들어진 후에 참조.
  //        이 코드 위치는 DOM 요소가 만들어지기 전에 실행되고 오류 발생
  console.log('이름: ', inputRef.current && inputRef.current.value) //useRef 는 current 속성으로 요소에 접근

  return (
    <>
      {/* DOM 요소에 직접 접근하기 위해 ref 속성 설정. 변수이름은 useRef() 로 선언 */}
      <input ref={inputRef} type='text' placeholder='이름을 입력하세요.' />
      <button onClick={handleFocus}>포커스 이동</button>
      <hr />
      <input
        value={nickname}
        placeholder='닉네임을 입력하세요.'
        onChange={(e) => setNickname(e.target.value)}
        // 값이 변경될 때 발생하는 이벤트
      />
      <div>닉네임 : {nickname}</div>
    </>
  )
}
