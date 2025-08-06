// import React from "react";

// // Normalize Unsplash links to direct image URLs
// function normalizeImageUrl(url) {
//   if (!url) return null;

//   if (url.includes("unsplash.com/photos/")) {
//     const match = url.match(/photos\/([a-zA-Z0-9_-]+)/);
//     if (match && match[1]) {
//       const id = match[1];
//       return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
//     }
//   }

//   return url;
// }

// function Coordinates({ trip }) {
//   return (
//     <div>
//       <h2 className="font-bold text-xl mt-5">Trip Co-ordinates</h2>

//       {trip?.tripData?.days?.map((day, index) => (
//         <div key={index} className="my-6">
//           <h3 className="text-xl font-semibold mb-2">Day {index + 1}</h3>

//           {day?.itinerary?.map((item, i) => {
//             const imageUrl = normalizeImageUrl(item.image);
//             return (
//               <div key={i} className="mb-5">
//                 <p className="font-medium">
//                   {item.place} — Lat: {item.coordinates?.lat}, Lng: {item.coordinates?.lng}
//                 </p>
//                 <img
//                   src={imageUrl}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/image.png"; // 🔁 Your fallback local image
//                   }}
//                   alt={item.place}
//                   className="w-full h-48 object-cover rounded-xl"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Coordinates;
