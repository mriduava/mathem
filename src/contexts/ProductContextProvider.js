import React, {createContext, useState} from 'react'
export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [productList, setProductList] = useState([]);
  const [productInfo, setProductInfo] = useState([])

  const updateProductList = (updates) => {
    setProductList(productList.concat(updates));
  };

  //Get Data from Mathem API
    const getProductInfo = async (productId) => {
    let res = await fetch('/api/mathems/' + productId);
    res = await res.json();
    setProductInfo(res);
    console.log(productInfo);
  };

  const values = {
    productList,
    updateProductList,
    getProductInfo,
    productInfo
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider
