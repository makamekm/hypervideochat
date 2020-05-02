/* eslint-disable no-restricted-globals */

console.log("hello from sw.js", self);

// function displayNotification() {
//   if (Notification.permission === "granted") {
//     // navigator.serviceWorker.getRegistration().then((reg) => {
//     //   const options = {
//     //     body: "Here is a notification body!",
//     //     // icon: 'images/example.png',
//     //     vibrate: [100, 50, 100],
//     //     data: {
//     //       dateOfArrival: Date.now(),
//     //       primaryKey: 1,
//     //     },
//     //     actions: [
//     //       {
//     //         action: "explore",
//     //         title: "Explore this new world",
//     //         icon: "images/checkmark.png",
//     //       },
//     //       {
//     //         action: "close",
//     //         title: "Close notification",
//     //         icon: "images/xmark.png",
//     //       },
//     //     ],
//     //   };
//     //   reg.showNotification("Hello world!", options);
//     // });

//     // const img = "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg";
//     const text = "Take a look at this brand new t-shirt!";
//     const title = "New Product Available";
//     const options = {
//       body: text,
//       // icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
//       vibrate: [200, 100, 200],
//       tag: "new-product",
//       // image: img,
//       // badge: "https://spyna.it/icons/android-icon-192x192.png",
//       actions: [
//         {
//           action: "Detail",
//           title: "View",
//           // icon: "https://via.placeholder.com/128/ff0000",
//         },
//       ],
//     };
//     navigator.serviceWorker.ready.then((serviceWorker) => {
//       console.log(serviceWorker);

//       serviceWorker.showNotification(title, options);
//     });
//   }
// }

// setInterval(() => displayNotification(), 5000);
