import { useState } from "react";
import AppRouter from "router";
import { authService } from "firebaseConfig";

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(authService.currentUser);
  return (
    <>
    <AppRouter
      isLoggedIn={isLoggedIn}
    />
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
