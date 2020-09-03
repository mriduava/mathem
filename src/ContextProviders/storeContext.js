import React, { createContext } from "react";

export const StoreContext = createContext();

export default function StoreContextProvider(props){

    const mathemHarvester = async () => {
        const res = await fetch(
          `https://api.mathem.io/product-search/noauth/search/products/10/categorytag/frukt-o-gront?size=1000&storeId=10&searchType=category&sortTerm=popular&sortOrder=desc`
        );
        res = await res.json();
        console.log(res);
    }


    const values = {

    }
      return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
}