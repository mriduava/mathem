import React, {useState, useContext} from "react";
import { FormGroup, Input } from 'reactstrap'
import { ProductContext } from '../contexts/ProductContextProvider'

const HomePage = () => {
  //const { products, setProducts } = useContext(ProductContext)
  const [products, setProducts] = useState([]);

  const searchProduct = async (search) => {
    let res = await fetch('/api/harvestMathem/' + search)
    res = await res.json()
    setProducts(res)
  }

  let searchTimer;
  const autoSearch = (search) => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(async () => {
      await searchProduct(search)
    }, 200);
  }

  const productsList = () => {
    return products.map((product, i) => {
      return (
        <div key={product._id}>
          <h4 style={{color:'#424242'}}>{product.productName}</h4>
          <h5 style={{color:'#FA5858'}}>{product.price} :-</h5>
          <p>{product.retail}</p>
        </div>
      )
    })
  }
  
  return (
    <div className="container">
      <FormGroup className="col-10">
        <Input type="text" 
          onChange={e => autoSearch(e.target.value)}
          placeholder="Sök varor" />
      </FormGroup>
      
      <div>
        {productsList()}
      </div>
    </div>
  );
}

export default HomePage;