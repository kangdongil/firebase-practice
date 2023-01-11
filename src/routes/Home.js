import { addDoc, collection, getDocs } from "firebase/firestore";
import { dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";

export default ({ userObj }) => {
    console.log(userObj);
    const [ nweet, setNweet ] = useState("");
    const [ nweets, setNweets ] = useState([]);
    const getNweets = async() => {
        const dbNweets = await getDocs(collection(dbService, "nweets"));
        dbNweets.forEach((document) => {
            const nweetObj = {
                ...document.data(),
                id: document.id,
            };
            setNweets((prev) => [nweetObj, ...prev]);
        })
    }
    useEffect(() => {
        getNweets();
        dbService.collection("nweets")
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