import React, { useState, useContext } from "react";
import {  Row, Col, CardImg, Modal, ModalBody, Input } from "reactstrap";
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

  // const listHeader = ()=>{
  //   return (<div>
  //       <hr />
  //         <Row>
  //           <Col xs="6" sm="6">
  //             Produkter
  //           </Col>
  //           <Col xs="2" sm="2">
  //             Pris
  //           </Col>
  //           <Col xs="1" sm="1">
  //             Butik
  //           </Col>
  //           <Col xs="3" sm="3" style={{ textAlign: "right" }}>
  //             Antal
  //           </Col>
  //         </Row>
  //       <hr />
  //     </div>)
  // }

  return(
    <div>
      {products ? 
      products.map((product, i) => {
      return (
        <Row key={product._id + i}
          style={{margin: '5px 0', padding: '1px 0', border: '1px solid #ddd'}}>
          <Col xs="10" sm="10" onClick={()=>{toggle(); getProductInfo(product._id);}}>
            <Row style={{cursor: 'pointer', backgroundColor: 'rgb(247 247 255)', padding: '1.2% 0'}}>
              <Col xs="1" sm="1">
                <CardImg top width="100%" src={product.image} alt="Card image cap" />
              </Col>
              <Col xs="5" sm="5">
                <h4 style={{color:'#424242'}}>{product.productName}</h4>
              </Col>
              <Col xs="2" sm="2">
                <h5 style={{color:'#FA5858'}}>{product.price} :-</h5>
              </Col>
              <Col xs="1" sm="1">
                <p>{product.retail}</p>
              </Col>
            </Row>
          </Col>
          <Col xs="2" sm="2" style={{textAlign: 'right', backgroundColor: 'rgb(234 234 234)'}} 
            onClick={() => addProduct(product,'+')}>
            <p>ADD</p>
          </Col>
          <hr/> 
        </Row>
      )
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
              </div>
              <p style={{color: '#294360', fontSize: '24px', textTransform: 'uppercase', margin: '5px 0 0 0'}}>{productInfo.retail}</p>        
              <div className="d-flex" style={{margin: '18px 0 0 0'}}>
                <div style={{color: 'green'}}>
                <h1><i class="fas fa-minus-circle"></i></h1>
                </div>
                <div style={{margin: '6px 5px 0 5px', width:"65px"}}>
                  <Input type="number" min="0" max="100" placeholder="0" />
                </div>
                <div style={{color: 'red'}}>
                <h1><i class="fas fa-plus-circle"></i></h1>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        </ModalBody>
        <ModalBody>
        <div style={{ marginLeft: '30px'}}>
           <p>Product description goes here...</p>
        </div>         
        </ModalBody>
      </Modal>
    </div>
  )
}
export default ProductMap