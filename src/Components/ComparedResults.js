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
    const keys = Object.keys(objList);
    //TODO figure out cheapest price per kg
    const length = Math.max(
      ...keys.map((retailor) => objList[retailor].length)
    );
    if (length <= 0) return;
    for (let i = 0; i < length; ++i) {
      const bestPrices = findAllValues(keys, i, objList, "price");
      updateLocalCompareList((objList[bestPrices][i].bestValue = true));
      // const bestBulkPrices = findAllValues(keys, i, objList, "kgPrice");
      // updateLocalCompareList((objList[bestBulkPrices][i].bestBulkValue = true));
    }
  };

  const findAllValues = (retailors, index, objOfArrsOfObj, value) => {
    const values = retailors.map((retailor) => {
      const product = objOfArrsOfObj[retailor][index];
      if (product === null) return Infinity;
      return typeof product === "object" && value in product
        ? product[value]
        : Infinity;
    });
    const minPrice = Math.min(...values);

    return retailors.filter((retailor) => {
      const product = objOfArrsOfObj[retailor][index];
      if (product === null) return false;
      return value in product ? product[value] === minPrice : false;
    });
  };

  useEffect(() => findBestValues(compareList), [compareList]);

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
                  console.log(product);
                  if (product !== null) {
                    return (
                      <Container
                        key={j}
                        style={{
                          Height: "300px",
                          marginBottom: "20px",
                          paddingBottom: "20px",
                        }}
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
                                    <h6>
                                      Denna produkten är billigast!{" "}
                                      {checkMarkEmoji}
                                    </h6>
                                  ) : (
                                    ""
                                  )}
                                  {product.bestBulkValue ? (
                                    <h6>Bästa kilo priset! {checkMarkEmoji}</h6>
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
                  } else {
                    return (
                      <Container
                        key={j}
                        style={{
                          Height: "300px",
                          marginBottom: "20px",
                          paddingBottom: "20px",
                        }}
                      ></Container>
                    );
                  }
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
