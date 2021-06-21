import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

// Don't re-initialize if an app has already been initialized.
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  // @ts-ignore
  if (process.env.FIREBASE_EMULATOR === "true") {
    firebase.auth().useEmulator("http://localhost:9099");
  }
}

export default firebase;
