import React, { createContext, useContext, useMemo } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const FirebaseContext = createContext();
export const useFirebase = () => {
  return useContext(FirebaseContext);
};
const FirebaseProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBarXthp4srkNus99JQEsCVdaL6aHiwAi0",
    authDomain: "play-d3d98.firebaseapp.com",
    projectId: "play-d3d98",
    storageBucket: "play-d3d98.appspot.com",
    messagingSenderId: "172701053750",
    appId: "1:172701053750:web:e6b002a2e17df6c5653997",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const values = useMemo(() => ({ auth, db }), [auth, db]);
  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
