## Infinite Scroll

### 요구사항
1. 최초 20개 목록 불러오기
2. 스크롤을 최하단으로 내리면 -> 'loading' 상태 표시가 나오고 -> 이후 20개 목록을 더 불러온다
3. 로딩 완료시 'loading' 사라짐 -> 가져온 목록이 하단에 추가된다 (무한반복)

- 기하 프로퍼티(단위:픽셀) ([출처](https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively))
- ![예시](./img/browser_value.png)
- [요소 사이즈와 스크롤](https://ko.javascript.info/size-and-scroll)
```javascript
const onScroll = (e) => {
  // do something (hint: e.target.scrollingElement)
  // 풀이하기 위해 생각해본 점 
  // : 스크롤이 마지막에 도달 -> 'loading' 표시 -> 이어서 랜더링 할 부분 가져옴 -> 화면에 보여줌
  const {clientHeight, scrollTop, scrollHeight} = e.target.scrollingElement;
  if (scrollHeight - scrollTop === clientHeight) {
    loadMore();
  }
};
```
- 풀이 코드
```javascript
const onScroll = (e) => {
  // do something (hint : e.target.scrollingElement)
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
  if (scrollTop + clientHeight === scrollHeight ) {
    fetchMore();
  }
};
```
- 문제에서 의도한대로 비슷하게 풀이
- 아쉬운점 : 스크롤이 움직일때마다 이벤트 발생 -> onScroll가 매번 실행