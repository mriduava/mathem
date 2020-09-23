import React, { useState, useContext } from "react";
import {  Row, Col, CardImg, Modal, ModalBody, Input, Button } from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";
import Product from './Product'

const ProductMap = ({products}, props) => {
  const { productInfo} = useContext(ProductContext);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return(
    <div>
      {products ? 
      products.map((product, i) => {
      return (
        <div key={product._id + i}>
          <Product product={product} i={i} toggle={toggle}/>
        </div>
      );
    }) : null}
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalBody>
        <Row>
          <Col sm="5" >
            <div style={{border: '1px solid #ddd',  marginLeft: '30px'}}>
              <CardImg top width="100%" src={productInfo.image} alt="Card image cap" />
            </div>
          </Col>
          <Col sm="7">
            <div style={{marginTop: '70px', lineHeight: '80%'}}>
              <h3 style={{color: '#294360', fontSize: '30px', margin: '10px 0'}}>{productInfo.productName}</h3>
              <p style={{color: '#ff1466', fontSize: '24px'}}>{productInfo.price} :- /st</p>
              <div className="d-flex">
              <p style={{color: '#294360', fontSize: '16px'}}>{productInfo.volume}</p>
              <p style={{color: '#294360', fontSize: '16px', marginLeft: '20px'}}>Jmf pris: {productInfo.comparePrice}/{productInfo.compareUnit}</p>
              <p style={{color: '#294360', fontSize: '16px', marginLeft: '20px'}}>Rabatt: {productInfo.discount ? productInfo.discount.memberDiscount : null}</p>
              </div>
              <p style={{color: '#294360', fontSize: '24px', textTransform: 'uppercase', margin: '5px 0 0 0'}}>{productInfo.retail}</p>        
              {/* <div className="d-flex" style={{margin: '18px 0 0 0'}}>
                <div style={{color: 'red'}}>
                  <h1 onClick={() => addProduct(productInfo,'+')}><i className="fas fa-minus-circle"></i></h1>
                </div>
                <div style={{margin: '6px 5px 0 5px', width:"65px"}}>
                  <Input type="number" min="0" max="100" placeholder="0" value={productInfo.quantity} />
                </div>
                <div style={{color: 'green'}}>
                  <h1 onClick={() => addProduct(productInfo,'-')}><i className="fas fa-plus-circle"></i></h1>
                </div>
              </div> */}
            </div>
          </Col>
        </Row>
        </ModalBody>
        <ModalBody>
        <div style={{ margin: '5px 30px', textAlign: 'justify'}}>
          <h6>PRODUCTBESKRIVNING</h6>
          <p>{productInfo.description? productInfo.description.productDescription: null}</p>
          <p>{productInfo.description? productInfo.description.ingredients: null}</p>
        </div>         
        </ModalBody>
      </Modal>
    </div>
  )
}
export default ProductMap