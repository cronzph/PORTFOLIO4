import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

/**
 * Firebase client config.
 * These keys are public by design (they identify the project, they do not grant access).
 * Access is controlled by database.rules.json — see README.
 *
 * Optional: move them into .env as VITE_FIREBASE_API_KEY, etc.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDdph8zC6lXC7V7Z3RKYYUSOjfJ_AGy-QY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'portfolio-b60f9.firebaseapp.com',
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    'https://portfolio-b60f9-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'portfolio-b60f9',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'portfolio-b60f9.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '292004537866',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:292004537866:web:b0393ee5e0b8c7a05e61f3',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
