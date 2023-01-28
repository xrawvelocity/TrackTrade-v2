import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ email: "", uid: "" });
    const [userData, setUserData] = useState({
        email: "",
        avatar: "",
        connections: [],
    });
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const signUp = async (email, username, password) => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await setDoc(doc(collection(db, "users"), user.user.uid), {
                email,
                username,
                avatar: "",
                connections: [],
                uid: user.user.uid,
                createdAt: Date.now(),
                winLoss: 0,
                totalTrades: 0,
            });
            history.push("/dashboard");
        } catch (err) {
            throw Error(err.message);
        }
    };

    const logIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            history.push("/dashboard");
        } catch (err) {
            throw Error(err.message);
        }
    };

    const logOut = async () => {
        console.log(currentUser);
        await signOut(auth);
    };

    onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        setLoading(false);
    });

    const getUserData = async () => {
        const docSnap = await getDoc(
            doc(collection(db, "users"), currentUser.uid)
        );
        if (docSnap.exists()) {
            setUserData(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("Cant get user data.");
        }
    };

    const value = {
        getUserData,
        userData,
        currentUser,
        signUp,
        logIn,
        logOut,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
