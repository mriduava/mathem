import React,{useContext, useState} from 'react'
import { Row, Col, CardImg, Input, Button } from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";

const Product = ({product, i, toggle}) => {
      const { getProductInfo, productList, updateProductList } = useContext(
        ProductContext
      );
        const [count, setCount] = useState(0);

        
      
        const addProduct = (product) => {
          const matchingProduct = productList.find(
            (x) => x.productFullName === product.productFullName
          );
          if (matchingProduct !== undefined) {
            matchingProduct.quantity = count
          } else {
            product.quantity = count;
            updateProductList(product);
          }
        };
    return (
      <Row
        key={product._id + i}
        style={{
          margin: "5px 0",
          padding: "1px 0",
          border: "1px solid #ddd",
        }}
      >
        <Col
          xs="10"
          sm="10"
          onClick={() => {
            toggle();
            getProductInfo(product._id);
          }}
        >
          <Row
            style={{
              cursor: "pointer",
              backgroundColor: "rgb(247 247 255)",
              padding: "1.2% 0",
            }}
          >
            <Col xs="1" sm="1">
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundSize: "cover",
                  overflow: "hidden",
                }}
              >
                <CardImg
                  top
                  width="100%"
                  src={product.image}
                  alt="Card image cap"
                />
              </div>
            </Col>
            <Col xs="6" sm="6">
              <h4 style={{ color: "#424242" }} className="ml-3">
                {product.productName}
              </h4>
              <p style={{ textTransform: "uppercase" }} className="ml-3">
                {product.retail}
              </p>
            </Col>
            <Col xs="2" sm="2">
              <h5 style={{ color: "#FA5858" }}>{product.price} :-</h5>
            </Col>
          </Row>
        </Col>
        <Col
          xs="2"
          sm="2"
          style={{
            textAlign: "right",
            backgroundColor: "rgb(234 234 234)",
          }}
        >
          <div
            className="d-flex justify-content-end"
            style={{ margin: "15px 0 0 0" }}
          >
            <div style={{ color: "red" }}>
              <h2>
                <i
                  className="fas fa-minus-circle"
                  onClick={() => setCount(count - 1)}
                ></i>
              </h2>
            </div>
            <div style={{ margin: "2px 5px 0 5px", width: "65px" }}>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                className="text-center"
                value={count ? count : product.quantity ? product.quantity : 0}
                onChange={(data) => {
                  setCount(data.target.value);
                }}
              />
            </div>
            <div style={{ color: "green" }}>
              <h2>
                <i
                  className="fas fa-plus-circle"
                  onClick={() => setCount(count + 1)}
                ></i>
              </h2>
            </div>
          </div>
          <Row className="col-12">
            <Button className="mx-auto" onClick={() => {addProduct(product)}}>Lägg till</Button>
          </Row>
        </Col>
        <hr />
      </Row>
    );
}
export default Product