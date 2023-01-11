import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";

export default ({ userObj }) => {
    const [ nweet, setNweet ] = useState("");
    const [ nweets, setNweets ] = useState([]);
    useEffect(() => {
        onSnapshot(collection(dbService, "nweets"), (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }
            ))
            setNweets(nweetArr);
        })
    }, [])
    const onSubmit = async(event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };
    const onChange = (event) => {
        const { value } = event.target;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    value={nweet}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Nweet"
                />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                    ))
                }
            </div>
        </div>
    )
};