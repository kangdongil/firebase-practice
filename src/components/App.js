import { useEffect, useState } from "react";
import AppRouter from "router";
import { authService } from "firebaseConfig";

function App() {
  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user){
        setIsLoggedIn(true);
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
      /> : "Initializing..."
    }
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
