import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA6kx7UnRoCPCCtrWK5YeWDGVGKTbHgJ_E",
    authDomain: "gbreactproject.firebaseapp.com",
    databaseURL: "https://gbreactproject-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gbreactproject",
    storageBucket: "gbreactproject.appspot.com",
    messagingSenderId: "333228009768",
    appId: "1:333228009768:web:76bccf2e81dee8e3ea081d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUp = async (email, pass) =>
    await createUserWithEmailAndPassword(auth, email, pass);

export const logIn = async (email, pass) =>
    await signInWithEmailAndPassword(auth, email, pass);

export const logOut = async () => await signOut(auth);

export const db = getDatabase(app);
export const userRef = ref(db, 'user');
export const chatsRef = ref(db, 'chats');
export const messagesRef = ref(db, 'messages');
export const getChatRefById = (id) => ref(db, `chats/${id}`);
export const getChatMsgsListRefById = (chatId) => ref(db, `messages/${chatId}/messageList`);
export const getChatMsgsRefById = (chatId) => ref(db, `messages/${chatId}`);