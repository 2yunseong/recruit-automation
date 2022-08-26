# Recruit-automation

### Intro
![automation](./img/automation_example.gif)
에코노베이션 신입모집을 위한 지원자 정보 추출 자동화 서비스
- 1차 서류 합격자 명단의 이름, 연락처, 이메일을 자동 추출
- 지원자 메세지 형식을 자동으로 생성
### Install
```
npm install
node node_modules/puppeteer-core/install.js
```

### Environment Setting
크롬 브라우저가 설치되어 있어야 합니다.

환경 변수를 사용하기 위해 다음과 같이 설정해야 합니다.

먼저, 루트 디렉토리에 `env`를 생성한 다음, `env.js` 파일을 생성합니다.

```js
// env.js
export const ID = "Trello ID"; 
export const PW = "Trello PW";
export const TRELLO_URL =
  "Trello URL";
export const REQUEST_HEADER = "합격자 보드 명";
```
그 다음, `data` 디렉토리에 `data.csv`로 지원자 구글폼을 `csv`형식으로 저장합니다. (data 디렉토리가 없으면 생성하기 바랍니다.)

### Execute
```
node main.js
```
이후  `result.csv`파일로 추출됩니다. 



