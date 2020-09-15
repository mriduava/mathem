import React, {createContext, useState} from 'react'

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
    const [productList, setProductList] = useState([]);

    const updateProductList = (updates) => {
      setProductList(productList.concat(updates));
    };

  //Get Data from Mathem API

  const values = {
    productList,
    updateProductList,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider
