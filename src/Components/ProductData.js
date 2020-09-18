import React, { useState, useContext } from "react";
import {  Row, Col, CardImg, Modal, ModalHeader, ModalBody } from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";

const ProductMap = ({products}, props) => {
  const { productList, updateProductList, productInfo, getProductInfo } = useContext(ProductContext);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const operators = {
    "+": function (a) {
      return a + 1;
    },
    "-": function (a) {
      return a - 1;
    },
  };

  const addProduct = (product, operator) => {
    const matchingProduct = productList.find(
      (x) => x.productFullName === product.productFullName
    );
    if (matchingProduct !== undefined) {
      matchingProduct.quantity = operators[operator](
        matchingProduct.quantity
      );
    } else {
      product.quantity = 1;
      updateProductList(product);
    }
  };

  return(
    <div>
      {products ? products.map((product, i) => {
      return (
        <Row key={product._id + i} onClick={()=>{toggle(); getProductInfo(product._id);}}
          style={{margin: '5px 0', padding: '5px 0', cursor: 'pointer', border: '1px solid #ddd'}}>
          <Col xs="1" sm="1">
            <CardImg top width="100%" src={product.image} alt="Card image cap" />
          </Col>
          <Col xs="5" sm="5"><h4 style={{color:'#424242'}}>{product.productName}</h4></Col>
          <Col xs="2" sm="2"><h5 style={{color:'#FA5858'}}>{product.price} :-</h5></Col>
          <Col xs="1" sm="1"><p>{product.retail}</p></Col>
          <Col xs="3" sm="3" style={{textAlign: 'right'}} onClick={() => addProduct(product,'+')}><p>ADD</p></Col>
          <hr/> 
        </Row>
      )
    }) : null}
      <Modal isOpen={modal} toggle={toggle} size="lg" onClick={toggle}>
        {/* <ModalHeader toggle={toggle} charCode="" className="className">
         
        </ModalHeader> */}
        <ModalBody>
        <Row>
          <Col sm="5" >
            <div style={{border: '1px solid #ddd', marginLeft: '30px'}}>
              <CardImg top width="100%" src={productInfo.image} alt="Card image cap" />
            </div>
          </Col>
          <Col sm="7">
           <div style={{marginTop: '90px',}}>
             <h3 style={{color: '#294360'}}>{productInfo.productName}</h3>
             <p style={{color: '#ff1466', fontSize: '28px'}}>{productInfo.price} :- /st</p>
             <p style={{color: '#294360', fontSize: '28px'}}>{productInfo.retail}</p>        
             <p style={{color: '#294360'}}>+/-</p>
            </div>
          </Col>
        </Row>
        </ModalBody>
        <ModalBody>
          <p>Product description goes here...</p>
        </ModalBody>
      </Modal>
    </div>
  )
}
export default ProductMap