import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { database } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCJsEVov6HtnpA17NI3hMkevWqk40Nm1B4",
  authDomain: "btt96-30e60.firebaseapp.com",
  databaseURL: "https://btt96-30e60-default-rtdb.firebaseio.com",
  projectId: "btt96-30e60",
  storageBucket: "btt96-30e60.appspot.com",
  messagingSenderId: "717174533954",
  appId: "1:717174533954:web:f239099ab9b4be5c22a2db",
  measurementId: "G-KR5JCJWH83"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get the user's device type from the user agent string


// Get the user's device type from the user agent string
function getDeviceType(userAgent) {
  if (/Android/i.test(userAgent)) {
    return "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return "iOS";
  } else if (/Windows Phone/i.test(userAgent)) {
    return "Windows Phone";
  } else if (/Windows/i.test(userAgent)) {
    return "Windows PC";
  } else if (/Macintosh/i.test(userAgent)) {
    return "Macintosh";
  } else if (/Linux/i.test(userAgent)) {
    return "Linux";
  } else {
    return "Unknown";
  }
}

// Get the user's internet provider from the user agent string
function getProvider(userAgent) {
  const providerRegex = /Mozilla\/5\.0 \((.*?)\)/;
  const providerMatch = providerRegex.exec(userAgent);
  if (providerMatch) {
    return providerMatch[1];
  } else {
    return "Unknown";
  }
}

// Send the user's location and additional tracking data to Firebase
function sendTrackingData(position, userAgent, databaseRef) {
  const deviceType = getDeviceType(userAgent);
  const provider = getProvider(userAgent);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  databaseRef.push({
    device_type: deviceType,
    provider: provider,
    latitude: latitude,
    longitude: longitude,
    accuracy: accuracy
  });
}

// Handle errors from geolocation API
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

// Get the user's location and send it to Firebase
function getLocation(databaseRef) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        sendTrackingData(position, navigator.userAgent, databaseRef);
      },
      (error) => {
        showError(error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// Call the getLocation function when the page loads
window.onload = () => {
  const database = firebase.database();
  const mdb = database.ref("btt96");
  const locationButton = document.getElementById("enter-button");
  locationButton.addEventListener("click", () => {
    getLocation(mdb);
  });
}
