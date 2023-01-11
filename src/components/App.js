import { useEffect, useState } from "react";
import AppRouter from "router";
import { authService } from "firebaseConfig";

function App() {
  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(authService.currentUser);
  const [ userObj, setUserObj ] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);
  return (
    <>
    { init ? 
      <AppRouter
        isLoggedIn={isLoggedIn}
        userObj={userObj}
      /> : "Initializing..."
    }
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
