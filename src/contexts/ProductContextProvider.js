import React, { createContext, useState } from "react";
export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [productList, setProductList] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
  const [compareList, setCompareList] = useState({});

  const updateProductList = (updates) => {
    setProductList(productList.concat(updates));
  };
  const updateCompareList = (update) => {
    setCompareList({ ...compareList, ...update });
  };

  //Get Data from Mathem API
  const getProductInfo = async (productId) => {
    let res = await fetch("/api/mathems/" + productId);
    res = await res.json();
    setProductInfo(res);
  };

  const values = {
    productList,
    updateProductList,
    getProductInfo,
    productInfo,
    compareList,
    updateCompareList,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
