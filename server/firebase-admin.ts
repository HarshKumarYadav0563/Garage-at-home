import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp({
    projectId: 'd2bcart-4abbd',
  });
}

export const auth = admin.auth();
export default admin;