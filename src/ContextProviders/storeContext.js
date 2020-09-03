import React, { createContext } from "react";

export const StoreContext = createContext();

export default function StoreContextProvider(props){

    const mathemHarvester = async () => {
        let res = await fetch('/api/harvestMathem');
        res = await res.json();
        console.log(res);

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