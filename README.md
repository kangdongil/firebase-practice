## Firebase란
- Google에서 제공하는 `NoSQL 3세대 DB`로, 빠른 빌드 경험을 제공한다.
- Firebase를 사용할지 기준은 다음과 같다.
  - 아이디어를 `빠르게 테스트`하기 적합함.
    - `DB코드 없이` DB를 사용할 수 있으며, `간편한 Authentication` 기능을 구현할 수 있다
  - 데이터 관련해 `Google에 의존`한다.
    - 실 프로젝트에 적합하지 않다.
  - CRUD 횟수 / 이미지용량 / 문자.메일서비스를 일정한 양을 초과할 시 `비용이 발생`한다

## Firebase 개발환경 준비하기
### React
1. `Create-React-App` 설치하기
```shell
npx create-react-app .
```
2. `src/`: `index.js`와 `App.js`를 제외한 파일들 정리하기
3. `src/components`와 `src/routes`를 `mkdir`하기
```shell
mkdir src/components src/routes
```
4. `App.js` >> `src/components`
```shell
mv src/App.js src/components
```
5. Enable `Absolute Imports`
  - [`CRA_Docs`](https://create-react-app.dev/docs/importing-a-component/#absolute-imports) How to enable Absolute Imports
  ```shell
  touch jsconfig.json
  ```
  ```yaml
    {
      "compilerOptions": {
        "baseUrl": "src"
      },
      "include": ["src"]
    }
  ```
### Git
- `rm -rf .git`
- `git init`
- `git remote add origin REPO_URL`
- `git commit -m "~"`
- `git push origin main`

### Firebase v9.0
1. Firebase 사이트에서 `Project` 만들기
    - [`Firebase Link`](https://console.firebase.google.com/) 접속하기
    - 구글계정 로그인 후, `Create a Project`하기
    - `Analytics` 설정 해제
2. `Web App` 추가하기
    - [`Google Docs`](https://firebase.google.com/docs/web/setup?authuser.0) 참고하기
3. `Firebase`를 `React` 프로젝트에 적용하기
    - `firebase` package 설치하기
      ```shell
      npm i firebase
      ```
    - `firebaseConfig.js`에 `Firebase SDK` 추가하기
      - `src/firebaseConfig.js` 만들기
      ```shell
      touch src/firebaseConfig.js
      ```
      - `NPM Module`식 `firebase SDK` 코드 넣기
      ```javascript
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "firebase/app";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        const firebaseConfig = {
        apiKey: "...",
        authDomain: "...",
        projectId: "...",
        storageBucket: "...",
        messagingSenderId: "...",
        appId: "..."
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
      ```
      - `app`을 `export default`하고 `index.js`에 `firebase`를 `import`하기
      ```javascript
      // firebaseConfig.js
      export default app;

      // index.js
      import firebase from "./firebaseConfig";
      ```
4. Firebase SDK 세부정보들을 `.env`에 별도로 분리하기
    - `.env` 만들고 소스 옮기기
    ```shell
    touch .env
    ```
    ```
    // .env
    REACT_APP_API_KEY=...
    REACT_APP_AUTH_DOMAIN=...
    REACT_APP_PROJECT_ID=...
    REACT_APP_STORAGE_BUCKET=...
    REACT_APP_MESSAGING_SENDER_ID=...
    REACT_APP_APP_ID=...
    ```
    - `.gitignore`에 `.env`를 추가하기
    - `process.env.__`로 `.env` 변수 받아오기

### React-Router-Dom
1. `react-router-dom` 설치하기
```shell
npm i react-router-dom
```
2. `router.js`와 `routes` 파일 생성하기
  ```shell
  touch src/router.js
  touch src/routes/{Auth.js, EditProfile.js, Home.js, Profile.js}
  ```
  - 한 줄 `<span>`을 render하는 `route`들을 만들기
  ```javascript
  import React from "react";

  export default () => <span>Message</span>;
  ```
3. `router.js`의 Router 구조 만들기
  - `BrowserRouter`, `Routes`, `Route`를 import하기
  ```javascript
  import  { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  ```
  - `AppRouter` 선언하기
  ```javascript
  ...
  const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <>
            <Route path="..." element={<Route />}> />
            ...
          </>
        </Routes>
      </Router>
    );
  }
  ```
  4. `AppRouter`를 `App.js`에 import하기
  ```javascript
  // router.js
  export default AppRouter;

  // App.js
  function App() {
    <AppRouter />
  }
  ```
  5. `state`는 `App.js`에서 선언하고 `prop`으로 넘겨받는다
  ```javascript
  // App.js
  function App() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    return(
      <AppRouter
        isLoggedIn={isLoggedIn}
      />
    )
  }

  // router.js
  const AppRouter = ({ isLoggedIn }) => {
    ...
  }
  ```

## `Firebase`로 `Authentication` 구현하기
### Project에 `firebase/auth` 적용하기
1. Firebase Docs 참고하기
  - [`Firebase Docs`](https://firebase.google.com/docs/web/learn-more?authuser=0#ways-to-add-web-sdks) How to apply Auth on FirebaseConfig
  - [`Firebase Docs`](https://firebase.google.com/docs/reference/js/auth.md?authuser=0#auth_package) Browser Auth Packages
2. `firebaseConfig.js`에 `auth` 기능 추가하기
  ```javascript
  // firebaseConfig.js
  import { getAuth } from "firebase/auth";

  ...
  const firebaseApp = initializeApp(firebaseConfig);

  export const authService = getAuth(firebaseApp);
  ```
3. `App.js`로 `auth`가 잘 import되었는지 확인하기
  ```javascript
  // App.js
  import { authService } from "firebaseConfig";

  function App() {
    const [ isLoggedIn ,setIsLoggedIn ] = useState(authService.currentUser);
  }
  ```

### `React`로 `Login Form` 만들기
1. JSX 구조 짜기
```javascript
<div>
  <form onSubmit={onSubmit}>
    <input type="email" required
      placeholder="Email" value={email}
      onChange={onChange}
    />
    <input type="password" required
      placeholder="Password" value={password}
      onChange={onChange}
    />
    <input type="submit" value="Log In" />
  </form>
</div>
```
2. `Email`과 `Password`의 `state` 정하기
```javascript
const [ email, setEmail ] = useState("");
const [ password, setPassword ] = useState("");
```
3. `Email`과 `Password`의 `<input>` 입력가능하게 하기
```javascript
const onChange = (event) => {
  const { name, value } = event.target;
  if (name === "email") {
    setEmail(value);
  } else if (name === "password") {
    setPassword(value);
  }
}
```
4. `Email`로 `Login` 또는 `SignIn`하기
  - [`Firebase Docs`](https://firebase.google.com/docs/auth/web/password-auth?authuser=0) Authenticate with Firebase using Password-Based Accounts
  - `firebase/auth`에서 다음 함수를 import한다.
    - `createUserWithEmailAndPassword`
    - `signInWithEmailAndPassword`
  - `async...await`문으로 sdk로부터 data 받을 때까지 대기한다.
  - `try..except`문으로 error를 표시한다
  ```javascript
  const onSubmit = async(event) => {
    event.preventDefault();
    let data;
    ...
    data = await createUserWithEmailAndPassword(
      authService, email, password
    )
  }
  ```
  ```javascript
  try {
    ...
  } catch(error) {
    console.log(error.message);
  }
  ```

### `Log In`과 `Sign Up` 구현하기
1. `onAuthStateChanged`로 로그인 여부 확인하기
  - Login 여부는 `[개발자도구]`-`[Application]`-`[IndexedDB]`에서 확인가능하다.
2. `useEffect`를 사용해 `Loading` 구현하기
```javascript
useEffect(() => {
  authService.onAuthStateChange((user) => {
    ...
    // User 여부에 따라 Login Form 숨기기
    // Loading 마무리여부 state로 표시하기
  })
}, []);
  { init ?
    //로그인된 이후 내용
    :
    //로딩중..
  }
```

### `Social Login` 구현하기
- [`Firebase Docs`](https://firebase.google.com/docs/auth/web/google-signin?authuser=0): Authenticate Social Login

1. Firebase 사이트에서 `Login Provider` 추가하기
  - Google
  - GitHub(별도의 `Github App` 설정 요함)
2. Social Login `Button` 만들기
3. 클릭할 때 `onClick` 이벤트 작성하기
  - `GoogleAuthProvider`
  - `GithubAuthProvider`
  - `signInWithPopup`
  ```javascript
  import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

  const onSocialClick = async(event) => {
    const { name } = event.target;
    let provider;
    switch (name) {
      case "google":
        provider = new GoogleAuthProvider;
        break;
      case "github":
        provider = new GithubAuthProvider;
        break;
    }
    await signInWithPopup(authService, provider);
  }
  ```

### LogOut 구현하기
1. Log Out `Button` 만들기
  - `<button>`에 `onClick` Prop 주기
2. `authService.signOut()`으로 로그아웃하기
3. `useNavigate`로 뒤로가기
  ```javascript
  import { useNavigate } from "react-router-dom";

  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
    // navigate("/", { replace: true });
  }
  ```