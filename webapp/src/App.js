import React from 'react';
import Main from './components/Main';
import * as firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig';

var config = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId
};
// Initialize Firebase
firebase.initializeApp(config);


class MyApp extends React.Component
{
  render() {
    return (
      <Main />
    );
  }
}

export default MyApp;
