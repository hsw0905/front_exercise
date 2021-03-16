### 이벤트, 이벤트 등록 
- 사용자가 버튼을 클릭하는 행위처럼 단말기와 애플리케이션이 처리할 수 있는 동작이나 사건
- 이벤트 주도형 프로그램 : 이벤트가 발생할때까지 기다렸다가 이벤트가 발생했을 때 미리 등록해 둔 작업을 수행
- 함수를 이벤트 처리기로 등록하는 방법
  1. HTML 요소의 속성으로 등록
     ```html
        <input type="button" onclick="changeColor();">
     ```
  2. DOM 요소의 프로퍼티로 등록
     ```javascript
        const btn = document.getElementById("button");
        btn.onclick = changeColor();
     ```
  3. addEventListener 메서드 사용
     ```javascript
        const btn = document.getElementById("button");
        btn.addEventListener("click", changeColor, false);
     ```
- 1,2 방법의 단점  
  특정 요소의 특정 이벤트에 대해서 이벤트 처리기를 단 하나만 등록할 수 있다.
    
- addEventListener를 사용했을때 장점  
  1. addEventListner로 등록한 함수는 같은 요소의 같은 이벤트에 이벤트 리스너 여러개 등록 가능
  2. 버블링, 캡처링 단계에서 활용 가능하다. 위의 DOM 요소 객체에 직접 등록한 이벤트 처리기는 버블링 단계의 이벤트만 캡처 가능 
  3. removeEventListener, stopPropagation, preventDefault를 활용, 이벤트 전파를 정밀하게 제어 가능
  4. HTML 요소 포함 모든 DOM 노드에 이벤트 리스너 등록 가능  

```javascript
    target.addEventListener(type, listener, useCapture);
// target : 이벤트 리스너를 등록할 DOM 노드
// type: 이벤트 유형을 뜻하는 문자열("click", "mouseup" 등)
// listener : 이벤트가 발생했을 때 처리를 담당하는 콜백 함수의 참조
// useCapture : 이벤트 단계
// -> ture : 캡처링 단계
// -> false : 버블링 단계(생략했을시 기본값)
```