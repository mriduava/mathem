import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProductData from "./ProductData";
import { ProductContext } from "../contexts/ProductContextProvider";
import ComparedResults from "./ComparedResults";

const Cart = () => {
  const { productList, updateCompareList } = useContext(ProductContext);
  const [modal, setModal] = useState(false);
  let debounceID = null;
  const toggle = () => setModal(!modal);

  const getProductComparison = async () => {
    try {
      let res = await fetch(`/api/cart/shopping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productList),
      });
      res = await res.json();
      console.log(res);
      if (Object.keys(res).length !== 0) {
        updateCompareList(res);
      }
    } catch {}
  };

  const debounceHelper = () => {
    if (debounceID !== null) {
      clearTimeout(debounceID);
      debounceID = null;
    }
    debounceID = setTimeout(() => {
      getProductComparison();
    }, 250);
  };

  const calculatePrice = () => {
    if (productList.length < 0) return 0;
    let totalPrice = 0;
    for (let i = 0; i < productList.length; i++) {
      totalPrice = totalPrice + productList[i].price;
    }
    return totalPrice;
  };

  return (
    <div>
      <Button color="warning" onClick={toggle}>
        Inköpslista
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle} charCode="" className="mx-auto">
          Kundvagn
        </ModalHeader>
        <ModalBody>
          {productList.length > 0 ? (
            <ProductData products={productList} />
          ) : (
            <h4 className="text-center">Tom kundvagn</h4>
          )}
          <h4>Summa: {calculatePrice()} kr</h4>
        </ModalBody>
        <ModalFooter>
          <Button
            color="warning"
            className="mr-auto"
            onClick={() => debounceHelper()}
          >
            Jämför
          </Button>
          <Button color="primary">Köp</Button>{" "}
          <Button color="success">Stäng</Button>
        </ModalFooter>
        <ComparedResults />
      </Modal>
    </div>
  );
};
export default Cart;
