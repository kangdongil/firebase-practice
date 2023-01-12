import { collection, getDocs, query, where } from "firebase/firestore";
import { authService, dbService } from "firebaseConfig";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default ({ userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/", { replace: true });
  };
  const getMyNweets = async () => {
    let myNweetArr = [];
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      myNweetArr.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(myNweetArr);
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
