import firebase from 'firebase/compat/app';

// Optionally import the services that you want to use
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBr7CqPwBtYlhuBEHZ5ZNj4YzkBmuXs85I',
  authDomain: 'recipes-2170a.firebaseapp.com',
  projectId: 'recipes-2170a',
  storageBucket: 'recipes-2170a.appspot.com',
  messagingSenderId: '471621053738',
  appId: '1:471621053738:web:7bb6485d935871f8708253',
};

//	Initialize Firebase
firebase.initializeApp(firebaseConfig);

//	Initialize service
const projectFirestore = firebase.firestore();

export { projectFirestore };
