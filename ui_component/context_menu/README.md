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

### 이벤트의 전파
- HTML 요소에서는 클릭 같은 사용자 행위와 프로그램 코드가 이벤트를 발생시킨다.
- 이벤트가 발생한 요소를 이벤트 타깃(target)이라 한다.
- HTML에서 자식 요소는 부모 요소 안에 겹쳐진 상태로 표시된다
- 이런 상태에서 자식 요소에 클릭(이벤트)하면, 컴퓨터는 자식 요소를 클릭한건지 부모 요소를 클릭한 것인지 알 수 없다.
- 그래서 어느 요소에 이벤트가 발생하면, DOM 트리의 관련된 요소(그 요소의 조상 요소들) 전체에 그 이벤트에 반응하는 이벤트 처리기나 이벤트 리스너가 등록되어 있는지 확인한다.
- 확인 후 등록된 함수가 있다면 그 함수를 실행하게 된다.
- 요소에서 이벤트 발생 -> 그 다음 단계 -> 그 이벤트를 다음 요소로 전파
- 그 단계에 해당하는 이벤트 처리가나 리스너가 있다? -> 실행

### 1.캡처링 단계
- 이벤트가 windows 객체에서 출발 -> DOM 트리를 타고 -> 이벤트 타겟까지 전파
- 캡처링 단계에 반응하도록 등록된 이벤트 리스너 요소에 등록된 이벤트 처리기, 리스너보다 먼저 실행된다.
- (이벤트 타겟이 이벤트를 받기 전에 먼저 이벤트를 빼돌리는(캡처하는) 단계)

### 2.타깃 단계
- 이벤트가 타겟에 전파되는 단계(타겟에 등록된 이벤트 처리기, 리스너가 이 시점에 실행)

### 3.버블링 단계
- 이벤트가 타겟에서 출발 -> DOM 트리를 타고 -> window 객체까지 전파