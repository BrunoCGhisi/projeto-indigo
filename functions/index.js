/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.getUserData = functions.https.onCall(async (data, context) => {
  const {uid} = data;

  try {
    const userRecord = await admin.auth().getUser(uid);
    return {
      success: true,
      data: {
        displayName: userRecord.displayName,
        email: userRecord.email,
        photoURL: userRecord.photoURL,
        // Add other user fields you need
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});
