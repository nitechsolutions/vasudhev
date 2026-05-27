importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

// Initialize Aplu
const apluPushConfig = {
    apiKey: "AIzaSyDWMxvpxTH82b_usj8oXHLCimB8GLGEIag",
	authDomain: "aplu-o.firebaseapp.com",
	projectId: "aplu-o",
	storageBucket: "aplu-o.firebasestorage.app",
	messagingSenderId: "631278452692",
	appId: "1:631278452692:web:c4b167c5a282bdab6ae041"
};

try {
    importScripts('https://push.aplu.io/import-aplu-messaging.js');
} catch (err) {
    console.warn("Couldn't load aplu-script, falling back: ", err);
}