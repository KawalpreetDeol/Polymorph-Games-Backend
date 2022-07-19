const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// Serverless Functions
exports.userSignup = functions.auth().user().onCreate(user => {
  const userStatus = admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    user_id: user.uid,
    first_name: '',
    last_name: '',
    settings: {
      colour_blind: false
    }
  });

  const scoreStatus = admin.firestore().collection('users').doc(user.uid).set({
    catastrophe: [],
    tennis: [],
    pictureperfect: [],
    darkharvest: []
  })

  const ratingsStatus = admin.firestore().collection('user_ratings').doc(user.uid).set({
    catastrophe: 0,
    tennis: 0,
    pictureperfect: 0,
    darkharvest: 0
  })

  return ratingsStatus
});

// total ratings update

// update ranking

// Microservices HTTPS Callable Functions
exports.userDeleted = functions.auth().user().onDelete(user => {
  const doc = admin.firestore().collection('users').doc(user.uid);
  const score_doc = admin.firestore().collection('scores').doc(user.uid);
  score_doc.delete();
  return doc.delete();
});

exports.updateUser = functions.https.onCall((data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unathenticated',
      'User is not authenticated. Please sign in.'
    )
  }
  const user = admin.firestore().collection('users').doc(context.auth.uid);
  
  return user.get().then(doc => {
    return user.update({
      email: user.email,
      user_id: user.uid,
      first_name: data.first_name || doc.data().first_name,
      last_name: data.last_name || doc.data().last_name,
      settings: {
        colour_blind: data.colour_blind || doc.data().settings.colour_blind
      }
    })
  })
});

exports.getUserInfo = functions.https.onCall((data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unathenticated',
      'User is not authenticated. Please sign in.'
    )
  }
  const user = admin.firestore().collection('users').doc(context.auth.uid);
  
  return user.get();
});

exports.updateScore = functions.https.onCall((data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unathenticated',
      'User is not authenticated. Please sign in.'
    )
  }
  const timestamp = admin.firestore.FieldValue.serverTimestamp()
  return admin.firestore().collection('scores').doc(user.uid).set({
    catastrophe: admin.firestore.FieldValue.arrayUnion({score: data.catastrophe, timestamp: timestamp}),
    tennis: admin.firestore.FieldValue.arrayUnion({score: data.tennis, timestamp: timestamp}),
    pictureperfect: admin.firestore.FieldValue.arrayUnion({score: data.pictureperfect, timestamp: timestamp}),
    darkharvest: admin.firestore.FieldValue.arrayUnion({score: data.darkharvest, timestamp: timestamp})
  });
});

exports.getScores = functions.https.onCall((data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unathenticated',
      'User is not authenticated. Please sign in.'
    )
  }
  const scores = admin.firestore().collection('scores').doc(context.auth.uid);
  
  return scores.get();
});

exports.getRatings = functions.https.onCall((data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unathenticated',
      'User is not authenticated. Please sign in.'
    )
  }
  return false
});

exports.updateUserRatings = functions.https.onCall((data, context) => {
  if(!context.auth) {
    throw new functions.https.HttpsError(
      'unathenticated',
      'User is not authenticated. Please sign in.'
    )
  }
  return false
});