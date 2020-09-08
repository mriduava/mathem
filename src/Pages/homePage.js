import React, {useState, useContext} from "react";
import { FormGroup, Input } from 'reactstrap'

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const searchProduct = async (search) => {
    let res = await fetch(`/api/mathem/${search}`);
    res = await res.json()
    console.log(res);
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
      <div className="d-flex justify-content-center">
      <FormGroup className="col-8 py-5">
        <Input type="text" className="mt-5"
          style={{padding: '25px', borderRadius: '20px', fontSize: '25px'}}
          onChange={e => autoSearch(e.target.value)}
          placeholder="Sök varor" />
      </FormGroup>
      </div>
      
      <div>
        {productsList()}
      </div>
    </div>
  );
}

export default HomePage;