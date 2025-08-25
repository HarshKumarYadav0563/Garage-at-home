import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp({
    projectId: 'tastelocale-d8722',
  });
}

export const auth = admin.auth();
export default admin;