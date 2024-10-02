// import { useState, useEffect } from "react";
// import axios from "axios";

// // Styles
// import "../assets/styles/home.css";

// const Orders = () => {
//   const [dataOrder, setDataOrder] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDataOrder = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/orders");
//         setDataOrder(response.data);
//         console.log(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.log("Erreur lors de la récupération des commandes ===>", error);
//         setIsLoading(false);
//       }
//     };
//     fetchDataOrder();
//   }, []);

//   return isLoading ? (
//     <div>Loading...</div>
//   ) : (
//     <main className="home">
//       <div>
//         {dataOrder.map((order) => {
//           return (
//             <div key={order._id}>
//               <h3>Commande #{order.orderNumber}</h3>
//               {/* <p>Date: {new Date(order.createdAt).toLocaleString()}</p> */}
//               <h4>Détails de la commande:</h4>
//               <div>
//                 {order.items.map((item, index) => (
//                   <p key={index}>
//                     {item.name} - {item.quantity} x {item.price} €
//                   </p>
//                 ))}
//               </div>
//               <p>Total: {order.totalPrice} €</p>
//             </div>
//           );
//         })}
//       </div>
//     </main>
//   );
// };

// export default Orders;
