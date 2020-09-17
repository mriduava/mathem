import React, {useState} from "react";
import { FormGroup, Input, Container, Row, Col} from 'reactstrap'
import ProductData from '../Components/ProductData'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  let debounceID = null


  const searchProduct = async (search) => {
    let res = await fetch(`/api/mathem/${search}`);
    res = await res.json();
    setProducts(res);
  };

  //The debounce is used to reduce the overall load on the frontend and used often in searchfields and large data transfers to api/rest
  //To make it simple, the debounce consists of a local variable in this case debounceID on line 7.
  //This is to prevent it from creating several copies of the variable. Check JS pointers and references on google.
  //And in the debounce helper function it checks if the debounceID isn't null/already has an instance running and stop the instance
  //Then creates a new instance. In simplicity it keeps on instance running all the time when somethi
  const debounceHelper = (search) => {
    if(debounceID !== null){
      clearTimeout(debounceID)
      debounceID = null
    }
    debounceID = setTimeout(() => {
      searchProduct(search)
    },250)
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

      <Container>
        <hr />
        <Row>
          <Col xs="6" sm="6">
            Produkter
          </Col>
          <Col xs="4" sm="4">
            Pris
          </Col>
          <Col xs="2" sm="2" style={{ textAlign: "right" }}>
            Butik
          </Col>
        </Row>
        <hr />
        {/* {productData} */}
        <ProductData products={products}/>
      </Container>
    </div>
  );
};

export default HomePage;
