import React from "react";

// export default const PropertyCard = ({ photo, price, size, address, ...otherProps }) => {
//   return (
//     <div className={styles.card}>
//       <img src={photo} alt="Property Photo" className={styles.image} />
//       <div className={styles.info}>
//         <p className={styles.price}>{price}</p>
//         <p className={styles.details}>
//           {size} sqft - {address}
//         </p>
//       </div>
//     </div>
//   );
// };

export function PropertyCard() {
  return (
    <div className="w-330 h-270 bg-white rounded-lg shadow-lg overflow-hidden m-2">
      <img src="/ai-img.jpg" alt="Property photo" className="w-full h-full object-cover"></img>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">3 Bed, 2 Bath House</h3>
        <p className="text-sm text-gray-500">123 Main Street, San Francisco, CA 94105</p>
        <div className="flex items-center mt-4">
          <span className="text-lg font-bold text-gray-800">$1,200,000</span>
          <span className="text-sm text-gray-500 ml-2">2,000 sqft</span>
        </div>
      </div>
    </div>
  );
};