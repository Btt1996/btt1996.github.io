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

// Get the user's location and call the callback function with the tracking data
function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const deviceType = getDeviceType(navigator.userAgent);
        const provider = getProvider(navigator.userAgent);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        const trackingData = {
          device_type: deviceType,
          provider: provider,
          latitude: latitude,
          longitude: longitude,
          accuracy: accuracy
        };
        callback(trackingData);

      },
      (error) => {
        showError(error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function getTrackingData() {
  getLocation((trackingData) => {
    // Construct the query parameters from the tracking data
    const queryParams = new URLSearchParams(trackingData).toString();
    
    // Redirect the user to index2.html with the query parameters
    window.location.href = `index2.html?${queryParams}`;
  });
}
