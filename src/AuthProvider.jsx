import {
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFirebase } from "./FirebaseProvider";
const AuthContext = createContext();
const actionCodeSettings = {
  url: "http://localhost:3000/get-link",
  handleCodeInApp: true,
};
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const { auth, db } = useFirebase();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(
    window.localStorage.getItem("emailForSignIn")
  );
  const login = useCallback(
    (email) => {
      sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setEmail(email);
    },
    [auth]
  );
  const logout = useCallback(() => {
    setUser(null);
    signOut(auth);
  }, [auth]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;
        const userCollection = collection(db, "users");
        const docRef = doc(userCollection, uid);
        setDoc(docRef, { email });
        setUser(user);
      }
    });
    return unsubscribe;
  }, [auth, db]);

  useEffect(() => {
    if (email) {
      const unsubscribe = onSnapshot(
        doc(collection(db, "tokens"), email),
        (snapshot) => {
          if (snapshot.exists()) {
            const { token } = snapshot.data();
            setToken(token);
          }
        }
      );
      return unsubscribe;
    }
    return () => null;
  }, [db, email]);

  useEffect(() => {
    console.log("token is", token);
    if (token) {
      console.log("token", token);
      let email = window.localStorage.getItem("emailForSignIn");
      console.log("email in localstorage", email);
      signInWithEmailLink(auth, email, token)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          // delete the token
          const tokenCollection = collection(db, "tokens");
          const docRef = doc(tokenCollection, email);
          deleteDoc(docRef);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth, db, token]);
  const values = useMemo(
    () => ({ user, login, logout }),
    [login, logout, user]
  );
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
