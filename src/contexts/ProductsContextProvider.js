import React, {createContext, useState, useEffect} from 'react'
import mongoosy from 'mongoosy/frontend';
const { Product } = mongoosy;

export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([])

  //Get Data from Citygross API
  const fetchCitygrossProducts = async (search) => {
    let res = await fetch('https://www.citygross.se/api/v1/esales/search/?Q=' + search)
    res = await res.json()
    setProducts(res);
    console.log(res.data.map(x=>x.name));
  }

  useEffect(()=>{
    //fetchCitygrossProducts("mjölk");
  }, [])

  const values={
    products
  }

  return (
    <ProductsContext.Provider value={values}>
      {props.children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider
