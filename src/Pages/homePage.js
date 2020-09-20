import React, {useState} from "react";
import { FormGroup, Input, Container, Row, Col} from 'reactstrap'
import ProductData from '../Components/ProductData'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const ecologic = false
  const discount = false
  
  const searchProduct = async (search) => {
    let res = await fetch(`/api/mathem/${search}?ecologic=${ecologic}&discount=${discount}`);
      res = await res.json();
      setProducts(res);
    }
    else{
      setProducts([])
    }
    if(search !== ""){
  };
  
  let debounceID = null
  //The debounce is used to reduce the overall load on the frontend and used often in searchfields and large data transfers to api/rest
  //To make it simple, the debounce consists of a local variable in this case debounceID on line 7.
  //This is to prevent it from creating several copies of the variable. Check JS pointers and references on google.
  //And in the debounce helper function it checks if the debounceID isn't null/already has an instance running and stop the instance
  //Then creates a new instance. In simplicity it keeps on instance running all the time when something is searched in the field.
  //This in turn also keeps the fetch from backend in one instance instead of creating several fetches at same time.
  //NOTE: A debounce is used widely in almost every project to reduce load on frontend and increase performance in the app overall.
  const debounceHelper = (search) => {
    if(debounceID !== null){
      clearTimeout(debounceID)
      debounceID = null
    }
    debounceID = setTimeout(() => {
      searchProduct(search)
    },250)
  }

   const listHeader = ()=>{
    if (products.length !== 0) {
      return (<div 
        style={{backgroundColor: 'rgb(218 218 218)', color: '#294360', fontSize: '24px', padding: '0 10px'}}>
      <hr />
        <Row>
          <Col xs="6" sm="6">Produkter</Col>
          <Col xs="3" sm="3">Pris</Col>
          <Col xs="3" sm="3" style={{ textAlign: "right" }}>Antal</Col>
        </Row>
      <hr />
    </div>)
    }
  }
  
  return (
    <div>
      <div className="d-flex justify-content-center">
        <FormGroup className="col-8 py-5">
          <Input
            type="text"
            className="mt-5"
            style={{ padding: "25px", borderRadius: "20px", fontSize: "25px" }}
            onChange={(e) => debounceHelper(e.target.value)}
            placeholder="Sök varor"
          />
        </FormGroup>
      </div>

      <Container >
        {listHeader()}
        <div className="product-list">
         <ProductData products={products}/>
        </div>
       
      </Container>
    </div>
  );
};

export default HomePage;
