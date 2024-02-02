console.log("Service Worker loaded.");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Received...");

  // Check if the Notification API is supported in the service worker context
  if ("Notification" in self) {
    const notification = new Notification("Title of Notification", {
      body: "Body of the notification",
      icon: "path/to/icon.png",
    });

    notification.onclick = function () {
      console.log("Notification clicked");
      // Handle click event, e.g., navigate to a specific page
    };

    setTimeout(() => {
      notification.close();
    }, 5000); // Close after 5 seconds
  } else {
    console.log("Notification API not supported in the service worker context");
  }

  // Handle the push notification
  self.registration.showNotification(data.title, { body: data.body });
});
