import React, { createContext } from "react";

export const StoreContext = createContext();

export default function StoreContextProvider(props){

    

    const values = {

    }
      return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
}