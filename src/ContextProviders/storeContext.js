import React, { createContext } from "react";

export const StoreContext = createContext();

export default function StoreContextProvider(props){

    const mathemHarvester = async () => {
        let res = await fetch(
          `https://api.mathem.io/product-search/noauth/search/query?size=1000&index=1&storeId=10&memberType=P&searchType=recommended`
        );
        res = await res.json();
        console.log(res.products);
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