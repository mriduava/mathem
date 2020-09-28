import React, { useState, useContext, useEffect } from "react";
import { Card, Row, Col, Button } from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";
import "../CSS/comparedList.css";

const ComparedResults = () => {
  const { compareList } = useContext(ProductContext);
  const prettyRetailor = {
    cityGross: "City Gross",
    mathem: "Mathem",
    willys: "Willys",
  };
  return (
    <div>
      <Row>
        {Object.keys(compareList).map((retail, i) => {
          const products = compareList[retail];
          return (
            <Col key={i} xs="3">
              <h1>{prettyRetailor[retail]}</h1>
              {products.map((p, j) => {
                return (
                  <Row key={j}>
                    <h6>{p.productName}</h6>
                  </Row>
                );
              })}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ComparedResults;
