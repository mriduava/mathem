import React, { useContext } from "react";
import {  Row, Col, CardImg } from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";

const ProductMap = ({products}) => {
      const { productList, updateProductList } = useContext(ProductContext);

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
          product.quantity = 1
          updateProductList(product);
        }
      };
      

      /* you're gonna have to take row tag as the modal opener tag*/
      //So in this case, every row that has the link to the product will be
      //the product modal opener, you're gonna have to create a productModal.js file
      //I'd say that it's gonna look something like:
      //products.map, <ProductInformation product=product keyproduct._id+i/>
    return(
    <div>
      {products ? products.map((product, i) => {
      return (
        <Row key={product._id + i} onClick={() => addProduct(product,undefined)}>
          <Col xs="1" sm="1">
            <CardImg top width="100%" src={product.image} alt="Card image cap" />
          </Col>
          <Col xs="5" sm="5"><h4 style={{color:'#424242'}}>{product.productName}</h4></Col>
          <Col xs="3" sm="3"><h5 style={{color:'#FA5858'}}>{product.price} :-</h5></Col>
          <Col xs="3" sm="3" style={{textAlign: 'right'}}><p>{product.retail}</p></Col>
          <hr/>
        </Row>
      )
    }) : null}
    </div>)
}
export default ProductMap