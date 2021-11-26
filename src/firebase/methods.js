import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "@firebase/firestore";
import { db } from "./firebase";

export const getTraderById = async (id) => {
    const docSnap = await getDoc(doc(collection(db, "users"), id));

    if (docSnap.exists()) {
        console.log(docSnap.data());
        let user = docSnap.data();
        return user;
    } else return { username: "Unknown" };
};

export const getAllTraders = async () => {
    const querySnap = await getDocs(collection(db, "users"));
    let all = [];
    querySnap.forEach((doc) => {
        all.push(doc.data());
    });
    return all;
};

export const getYourIdeas = async (id) => {
    const docSnap = await query(
        doc(collection(db, "ideas")),
        where("trader", "==", id)
    );

    if (docSnap.exists()) {
        console.log(docSnap.data());
        return docSnap.data();
    } else return [];
};

export const getAllIdeas = async () => {
    const querySnap = await getDocs(collection(db, "ideas"));
    let all = [];
    querySnap.forEach((doc) => {
        all.push(doc.data());
    });
    return all;
};
