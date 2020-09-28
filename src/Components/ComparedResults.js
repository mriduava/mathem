import React, { useState, useContext, useEffect } from "react";
import { Card, Row, Col, Button, CardImg } from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";
import "../CSS/comparedList.css";

const ComparedResults = () => {
  const { compareList } = useContext(ProductContext);
  const prettifyRetailor = {
    cityGross: "City Gross",
    mathem: "Mathem",
    willys: "Willys",
  };

  const findBestValues = (objList) => {
    let results = [];

    const keys = Object.keys(objList);
    const length = Math.max(...keys.map((p) => objList[p].length));
    for (let i = 0; i < length; ++i) {
      results = keys.filter((obj) => {
        return objList[obj][i]
          ? objList[obj][i].price ===
              Math.min(
                ...keys.map((p) =>
                  typeof objList[p][i] === "object"
                    ? objList[p][i].price
                    : Infinity
                )
              )
          : false;
      });
      objList[results][i].bestValue = true;
    }
  };

  useEffect(() => {
    findBestValues(compareList);
  }, [compareList]);

  return (
    <div>
      <Row>
        {Object.keys(compareList).map((retail, i) => {
          const products = compareList[retail];
          return (
            <Col key={i}>
              <h1>{prettifyRetailor[retail]}</h1>
              {products.map((p, j) => {
                return (
                  <Row key={j}>
                    {p.productName}
                    {p.price}
                    {p.bestValue ? "bestPrice" : ""}
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
