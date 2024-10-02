import { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderValidated, setOrderValidated] = useState("");
  return (
    <OrderContext.Provider value={{ orderValidated, setOrderValidated }}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderContext;
