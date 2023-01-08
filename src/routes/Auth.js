import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "firebaseConfig";
import React, { useState } from "react";

export default () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ newAccount, setNewAccount ] = useState(true);
    const [ error, setError ] = useState("");

    const onChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        let data;
        try {
            if (newAccount) {
                data = await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password,
                );
            } else {
                data = await signInWithEmailAndPassword(
                    authService,
                    email,
                    password,
                );
            }
            console.log(data);
        } catch(error) {
            console.log(`Firebase: ${error.message}`);
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={onChange}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={onChange}
            />
            <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>
)};