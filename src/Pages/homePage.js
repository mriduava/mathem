import React, {useState, useContext} from "react";
import { FormGroup, Input, Container, Row, Col, CardImg } from 'reactstrap'

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const searchProduct = async (search) => {
    let res = await fetch(`/api/mathem/${search}`);
    res = await res.json()
    setProducts(res)
  }
  
  let searchTimer;
  const autoSearch = (search) => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(async () => {
      await searchProduct(search)
    }, 500);
  }

  const productsList = () => {
    return products.map((product, i) => {
      return (
        <Row key={product._id}>
          <Col xs="1" sm="1">
            <CardImg top width="100%" src={product.image} alt="Card image cap" />
          </Col>
          <Col xs="5" sm="5"><h4 style={{color:'#424242'}}>{product.productName}</h4></Col>
          <Col xs="3" sm="3"><h5 style={{color:'#FA5858'}}>{product.price} :-</h5></Col>
          <Col xs="3" sm="3" style={{textAlign: 'right'}}><p>{product.retail}</p></Col>
          <hr/>
        </Row>
      )
    })
  }
  
  return (
    <div>
      <div className="d-flex justify-content-center">
      <FormGroup className="col-8 py-5">
        <Input type="text" className="mt-5"
          style={{padding: '25px', borderRadius: '20px', fontSize: '25px'}}
          onChange={e => autoSearch(e.target.value)}
          placeholder="Sök varor" />
      </FormGroup>
      </div>
      
      <Container>
        <hr/>
        <Row >
          <Col xs="6" sm="6">Produkter</Col>
          <Col xs="4" sm="4">Pris</Col>
          <Col xs="2" sm="2" style={{textAlign: 'right'}}>Butik</Col>       
        </Row>
        <hr/>
        {productsList()}
      </Container>
    </div>
  );
}

export default HomePage;