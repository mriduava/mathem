import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, CardImg, Container } from "reactstrap";
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
              <div>
                {products.map((product, j) => {
                  //TODO reuse code above to check max length of the longest array and create dummy ones for correct
                  return (
                    <Container
                      key={j}
                      style={{ maxHeight: "300px", marginBottom: "20px", paddingBottom: "20px" }}
                    >
                      <Col>
                        <div className="center">
                          <Card
                            style={{ height: "300px", paddingBottom: "30px" }}
                            className="link"
                            onClick={() => window.open(product.url)}
                          >
                            <div>
                              <div>
                                <div>
                                  <CardImg
                                    src={product.image}
                                    top
                                    style={{ maxHeight: "200px" }}
                                  />
                                  <div className="centerText">
                                    <h5>{product.productName}</h5>
                                  </div>
                                </div>
                              </div>

                              <b>{product.price} kr</b>
                              <div className="centerText">
                                {product.bestValue ? (
                                  <b>
                                    Denna produkten är billigast!{" "}
                                    {checkMarkEmoji}
                                  </b>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </Card>
                        </div>
                      </Col>
                    </Container>
                  );
                })}
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ComparedResults;
