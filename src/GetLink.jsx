import { isSignInWithEmailLink } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirebase } from "./FirebaseProvider";

const GetLink = () => {
  const { auth, db } = useFirebase();
  const [email, setEmail] = useState();
  const [completed, setCompleted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setDoc(doc(db, "tokens", email), { token: window.location.href }).then(
        () => {
          setCompleted(true);
        }
      );
    }
  };

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let localStorageEmail = window.localStorage.getItem("emailForSignIn");
      if (localStorageEmail) {
        setDoc(doc(db, "tokens", localStorageEmail), {
          token: window.location.href,
        }).then(() => {
          setCompleted(true);
        });
      }
    }
  }, [auth, db]);

  return (
    <div>
      {completed ? (
        <div>Completed, you can now close this window</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Get Link</button>
        </form>
      )}
    </div>
  );
};

export default GetLink;
