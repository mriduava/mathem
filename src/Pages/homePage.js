import React, {useState} from "react";
import { FormGroup, Input, Container, Row, Col} from 'reactstrap'
import ProductData from '../Components/ProductData'

const HomePage = () => {
  const [products, setProducts] = useState([]);



  const searchProduct = async (search) => {
    let res = await fetch(`/api/mathem/${search}`);
    res = await res.json();
    setProducts(res);
  };

  let searchTimer;
  const autoSearch = (search) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(async () => {
      await searchProduct(search);
    }, 500);
  };
  
  return (
    <div>
      <div className="d-flex justify-content-center">
        <FormGroup className="col-8 py-5">
          <Input
            type="text"
            className="mt-5"
            style={{ padding: "25px", borderRadius: "20px", fontSize: "25px" }}
            onChange={(e) => autoSearch(e.target.value)}
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
