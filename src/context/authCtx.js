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

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ email: "", uid: "" });
    const [userData, setUserData] = useState({ email: "" });
    const [loading, setLoading] = useState(true);

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
            });
        } catch (err) {
            console.log(err);
        }
    };

    const logIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
        }
    };

    const logOut = async () => {
        await signOut(auth);
    };

    onAuthStateChanged(auth, async (user) => {
        console.log(user);
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
            console.log("No such document!");
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
