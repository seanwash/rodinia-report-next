import firebase from "firebase/app";
import "firebase/auth";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Don't re-initialize if an app has already been initialized.
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCredentials);
}

export default firebase;
