import { addDoc, collection, getDocs } from "firebase/firestore";
import { dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";

export default () => {
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
        getNweets()
    }, [])
    const onSubmit = async(event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt: Date.now(),
        });
        setNweet("");
    };
    const onChange = (event) => {
        const { value } = event.target;
        setNweet(value);
    }
    console.log(nweets);
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
                        <h4>{nweet.nweet}</h4>
                    </div>
                    ))
                }
            </div>
        </div>
    )
};