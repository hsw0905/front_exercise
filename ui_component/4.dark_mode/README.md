# Dark Mode

## 요구사항
1. 로컬 스토리지에 저장되어 있는 테마(Light mode/Dark mode)를 기준으로 초기 렌더링한다.
2. 로컬 스토리지에 저장된 테마가 없다면 라이트 모드로 초기 렌더링한다.
3. 테마를 적용하여 초기 렌더링할 때 기존 테마가 변경되어 깜빡거리는 현상(flash of incorrect theme, FOIT)이 발생하지 않도록 한다.
4. 토글 버튼을 클릭하면 로컬 스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.
---
- [왜 다크모드를 사용하게 되었는가?](https://m.blog.naver.com/thwy/221843438724)
- 초기 상태
1. CSS: body -> visibility: hidden; 부분 때문에 html파일을 열었을때 아무것도 안 보이는 상태(이렇게 설정한 이유가 있었음..)
2. localstorage: key: theme, value: light 상태
- 생각해본 점
- 다크 모드 / 라이트 모드를 적용 후 렌더링 하려면 어떻게 해야 할까? 
- html 페이지가 열리면 -> local storage 접근 -> theme이 light인지, dark인지 파악 -> 그에 맞게 렌더링
- html 페이지가 열리면 : [html 생명주기에 관여하는 이벤트](https://ko.javascript.info/onload-ondomcontentloaded)
- local storage 접근 : [로컬 스토리지와 세션 스토리지](https://ko.javascript.info/localstorage)
```javascript
// DOMContentLoaded : html -> DOM 트리 완성, CSS, img 등의 스타일시트 자원이 오기 전
document.addEventListener('DOMContentLoaded', () => {
  // 1. 로컬 스토리지에 저장되어 있는 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링한다.
  // 2. 로컬 스토리지에 저장된 테마가 없다면 라이트 모드로 초기 렌더링한다.
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  localStorage.setItem('theme', 'light');
  document.body.classList.remove('dark');
  
  // 3. 테마를 적용하여 초기 렌더링할 때 기존 테마가 변경되어 깜빡거리는 현상(flash of incorrect theme, FOIT)이 발생하지 않도록 한다.
  // ... 조금 늦게 보여준다?
  document.body.style.visibility = 'visible';
});

// 4. 토글 버튼을 클릭하면 로컬 스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.
document.querySelector('.toggle-button').onclick = () => {
  // 로컬스토리지에 저장된 theme가 dark이면 light로 변경하고 light이면 dark로 변경한다.
  // body 요소에 dark 클래스를 추가되어 있으면 제거히고 그렇지 않으면 추가한다.
  // Write JS Code Here!
  if (localStorage.getItem('theme') === 'light') {
    localStorage.setItem('theme', 'dark');
    document.body.classList.add('dark');
  }
  else if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
    document.body.classList.remove('dark');
  }
  else {
    console.log('Wrong theme value');
  }
};
```
- 동영상 풀이
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // 1. 로컬 스토리지에 저장되어 있는 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링한다.
    const theme = localStorage.getItem('theme');

    // 2. 로컬 스토리지에 저장된 테마가 없다면 라이트 모드로 초기 렌더링한다.
    if (!theme) localStorage.setItem('theme', 'light');

    // 로컬스토리지에 저장된 theme가 dark이면 body 요소에 dark 클래스를 추가하고 그렇지 않으면 제거한다.
    document.body.classList.toggle('dark', theme === 'dark');

    // 3. 테마를 적용하여 초기 렌더링할 때 기존 테마가 변경되어 깜빡거리는 현상(flash of incorrect theme, FOIT)이 발생하지 않도록 한다.
    // .toggle-button-switch 요소와 .toggle-button-text 요소는 0.3초(duration)에 걸쳐 transition이 일어나도록 되어 있다.
    setTimeout(() => {
        document.body.style.visibility = 'visible';
    }, 300);
});

// 4. 토글 버튼을 클릭하면 로컬 스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.
document.querySelector('.toggle-button').onclick = () => {
  // 로컬스토리지에 저장된 theme가 dark이면 light로 변경하고 light이면 dark로 변경한다.
  localStorage.setItem('theme', `${localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'}`);

  // body 요소에 dark 클래스를 추가되어 있으면 제거히고 그렇지 않으면 추가한다.
  document.body.classList.toggle('dark');
};
```
- 놓친 부분 
1. 깜빡임 현상 제거 -> setTimeout() 이용
2. classList.add / remove -> classList.toggle() 사용이 더 깔끔
4. theme의 값이 light / dark 외에 다른 값이 올 경우는 고려하지 않아도 될듯
---
### 추가로 구현해볼 부분
1. 사용자가 지정한 테마가 없는 경우 OS가 제공하는 라이트/다크 모드를 적용되게 할 것

- 생각해본 점
- OS 레벨에서 제공하는 theme을 어떻게 감지할까?
- CSS
1. [미디어 쿼리](https://developer.mozilla.org/ko/docs/Web/CSS/Media_Queries)
2. [prefer-color-scheme](https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-color-scheme)
- JavaScript (CSS의 미디어쿼리를 JS로 사용)
1. [matchMedia-MDN](https://developer.mozilla.org/ko/docs/Web/API/Window/matchMedia)
2. [blog](https://eunsukim.me/posts/how-to-use-media-query-with-javascript-matchmedia)

- 동영상 풀이
```javascript
document.addEventListener('DOMContentLoaded', () => {
  let theme = localStorage.getItem('theme');

  // 1. 로컬 스토리지에 저장된 테마가 없다면 window.matchMedia 메서드로 사용자 OS 테마를 감지해 이를 테마에 적용한다.
  // 2. 로컬 스토리지에 저장된 테마가 있다면 사용자 OS 테마보다 이를 우선 적용한다.
  if (!theme) {
    // 사용자 OS 테마가 다크 모드이면 matches는 ture다.
    const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
    theme = matches ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }
  / ... 생략
```