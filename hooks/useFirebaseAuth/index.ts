import { useState, useEffect } from "react";
import firebase from "../../lib/firebase";

export interface FormattedUser {
  uid: string;
  email: string | null;
}

const formatAuthUser = (user: firebase.User): FormattedUser => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<FormattedUser>();
  const [loading, setLoading] = useState<boolean>(true);

  const clear = () => {
    setAuthUser(undefined);
    setLoading(true);
  };

  const signOut = () => firebase.auth().signOut().then(clear);

  const authStateChanged = async (user: firebase.User | null) => {
    if (!user) {
      setAuthUser(undefined);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(user);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for firebase state change
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signOut,
  };
}
