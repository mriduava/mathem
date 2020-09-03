import React, { createContext } from "react";

export const StoreContext = createContext();

export default function StoreContextProvider(props){

    const mathemHarvester = async (searcWord) => {
        await fetch("/api/harvestMathem")
          .then((res) => res.json())
        ;
    }

    mathemHarvester()

    const values = {

    }
      return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
}