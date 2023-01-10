import { addDoc, collection } from "firebase/firestore";
import { dbService } from "firebaseConfig";
import React, { useState } from "react";

export default () => {
    const [ nweet, setNweet ] = useState("");
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
    return (
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
    )
};