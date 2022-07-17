# #노담이면\_좋겠어 Smoquit

매 번 금연을 도전은 하는데 동기부여가 없어 실패하는 사람들을 위한 금연 카운터입니다.

[서비스 링크 🔗](https://custardcream98.github.io/smoquit/)

## 구현 목표

- 금연 시작 및 금연 포기 로직 구현
- 지금까지의 도전 내용 조회
- 지금까지 몇개피의 담배를 피우지 않았고, 돈은 얼마나 아꼈는지 보여주기
- 금연 Leaderboard
- 내 친구의 금연 상황 보기 (경쟁적 금연 유도)
- 친구와 금연 내기 기능 구현

## Stack 및 얻고자 하는 것

- `React.js` `Redux` `Redux-Tunk` `Firebase`
- NoSQL 자유자재로 다루기
- React.js로 예쁜 UI 구현하기
- 실제 서비스하는 경험 얻기

---

## 구현된 기능

### 로그인

![로그인](./img//login.gif)

### 금연 시작

![금연시작](./img/createCampaign.gif)

### 금연 포기

![금연포기](./img/endCampaign.gif)

---

## NoSQL Firestore DB Structure

`💼 Collection` `📙 Doc` `📄 Field`

- 💼 **campaigns_by_user**

  - 📙 **uid**: 유저별로 발급되는 uid
    - 💼 **campaigns**
      - 📙 **startsAt**: 각 캠페인(금연)의 시작 시각을 id로
        - 📄 **name**: 캠페인 이름(간단한 메모)
        - 📄 **startsAt**: 캠페인 시작 시각(int, Timestamp in millisecounds)
        - 📄 **endsAt**: 캠페인 종료 시각, 각 캠페인 포기시에 set(int, Timestamp in millisecounds)

- 💼 **profile**: user에 추가로 저장해야 하는 정보
  - 📙 **uid**
    - 📄 **sigPerDay**: 하루에 몇개피 펴왔는지에 대한 정보, 메인 화면에서 필요한 정보 계산에 사용

---

# What I've Learned

천천히 정리할 예정입니다

## Redux-Tunk

Redux 미들웨어로, Redux Store의 dispatch, getState 메소드와 상호작용이 필요한 로직을 구현할 수 있게 도와줍니다. Redux 공식 문서에서 권장하는 방법처럼 Redux Toolkit을 사용한다면 기본적으로 포함되는 미들웨어입니다.

Redux에서는 원래 action을 dispatch해 간단한 동기(synchronous)적인 연산만 가능합니다. API fetch과 같이 비동기 연산으로 Store를 유지할 필요가 있다면 Redux Tunk같은 미들웨어의 도움을 받아야 합니다.
