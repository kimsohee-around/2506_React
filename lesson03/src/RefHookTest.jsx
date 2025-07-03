import { useRef } from 'react'

export function FocusInput() {
  // 컴포넌트
  const inputRef = useRef(null) // 재렌더링할 때 이전 값 유지

  const handleFocus = () => {
    // 이벤트 함수
    inputRef.current.focus() // DOM 요소에 직접 접근(getElementById 동일한 동작)
    console.log('이름: ', inputRef.current.value) //useRef 는 current 속성으로 요소에 접근
    // input 요소는 value 를 꼭 써야 합니다.
    inputRef.current.value = '테스트 중입니다.'
  }

  return (
    <>
      {/* DOM 요소에 직접 접근하기 위해 ref 속성 설정 */}
      <input ref={inputRef} type='text' placeholder='이름을 입력하세요.' />
      <button onClick={handleFocus}>포커스 이동</button>
      <hr />
    </>
  )
}
