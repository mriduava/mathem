import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, CardImg } from "reactstrap";
import { ProductContext } from "../contexts/ProductContextProvider";
import "../CSS/comparedList.css";

const ComparedResults = () => {
  const { compareList } = useContext(ProductContext);
  const [localCompareList, setlocalCompareList] = useState({});
  const updateLocalCompareList = (updates) => {
    setlocalCompareList({ ...localCompareList, ...updates });
  };
  const checkMarkEmoji = "✅";

  const prettifyRetailor = {
    cityGross: "City Gross",
    mathem: "Mathem",
    willys: "Willys",
  };

  const findBestValues = (objList) => {
    let results = [];
    //TODO figure out cheapest price per kg

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
      updateLocalCompareList((objList[results][i].bestValue = true));
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
            <Col key={i} className="clearfix centerText">
              <h1>{prettifyRetailor[retail]}</h1>

              {products.map((product, j) => {
                //TODO reuse code above to check max length of the longest array and create dummy ones for correct
                return (
                  <Row key={j}>
                    <Card>
                      <div>
                        <Card>
                          <div>
                            <CardImg
                              src={product.image}
                              className="link card-img-top"
                              onClick={() => window.open(product.url)}
                            />
                          </div>
                          <div className="centerText">
                            <h3
                              className="link"
                              onClick={() => window.open(product.url)}
                            >
                              {product.productName}
                            </h3>
                          </div>
                          <br />
                          <b>{product.price} kr</b>
                          <div className="centerText">
                            {product.bestValue ? (
                              <h5>
                                Denna produkten är billigast! {checkMarkEmoji}
                              </h5>
                            ) : (
                              ""
                            )}
                          </div>
                        </Card>
                      </div>
                    </Card>
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
