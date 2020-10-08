import React, { useState, useContext} from "react";
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
      <div onClick={toggle} style={{color: "#fff", marginRight: "40px"}}>
        <div style={{width: "30px", height: "30px", backgroundColor: "#fff", 
          borderRadius: "50%", padding: "0 0 5px 0", position: "absolute",
          right: 65, top: 10, textAlign: "center",
          color: "red", fontSize: "20px"}}>{productList.length}
      </div>
        <div onClick={toggle} 
          style={{cursor: "pointer", fontSize: "24px", width: "160px", height: "50px",
            color: "#294360", backgroundColor: "#FFC654", padding: "5px 5px", borderRadius: "5px"}}>
          <i className="fas fa-cart-arrow-down"></i> Inköpslista</div>
      </div>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle} charCode="" className="mx-auto">
          Kundvagn
        </ModalHeader>
        <ModalBody>
          {productList.length > 0 ? (
            <ProductData products={productList} inCart={true} />
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
          <Button color="success" toggle={toggle}>
            Stäng
          </Button>
        </ModalFooter>
        <ComparedResults />
      </Modal>
    </div>
  );
};
export default Cart;
