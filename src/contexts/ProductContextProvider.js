import React, {createContext, useState, useEffect} from 'react'

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState([])

  //Get Data from Mathem API

  const values={
    products,
    setProducts
  }

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider
