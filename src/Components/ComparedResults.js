import React, { useState, useContext, useEffect } from "react";
import { Card, Row, Col, Button } from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";
import "../CSS/comparedList.css";

const ComparedResults = () => {
  const { productList } = useContext(ProductContext);
  const [compareList, setCompareList] = useState({});

  const getProductComparison = async () => {
    try {
      let res = await fetch(`/api/cart/shopping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productList),
      });
      res = await res.json();
      if (res.length > 0) {
        updateCompareList(res);
      }
    } catch {}
  };

  const updateCompareList = (update) => {
    setCompareList({ ...compareList, ...update });
  };

  useEffect(() => {
    getProductComparison();
  }, [productList]);

  const test = () => {
    console.log(compareList);
  };

  return (
    <div>
      <Button onClick={test}>TEST</Button>
    </div>
  );
};

export default ComparedResults;
