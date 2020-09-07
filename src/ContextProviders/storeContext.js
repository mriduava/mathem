import React, { createContext } from "react";
import fetch from "node-fetch";

export const StoreContext = createContext();

export default function StoreContextProvider(props){

    

    const mathemHarvester = async (searcWord) => {
        await fetch("/api/mathem")
          .then((res) => res.json())
          //.then((data) => console.log(data));
        ;
    }

    const test = async () => {
      await fetch('/api/harvestWillys').then((res) => res.json()).then((data) => console.log(data))
    }

    mathemHarvester()
    test()

    const values = {

    }
      return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
}