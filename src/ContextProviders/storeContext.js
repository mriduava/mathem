import React, { createContext } from "react";

export const StoreContext = createContext();

export default function StoreContextProvider(props){

    const mathemHarvester = async (searcWord) => {
        await fetch("/api/mathem")
          .then((res) => res.json())
          .then((data) => console.log(data));
        ;
    }

    mathemHarvester("yes")

    const values = {

    }
      return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
}