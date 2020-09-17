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
