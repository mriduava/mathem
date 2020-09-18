import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row } from "reactstrap";
import ProductData from './ProductData'
import { ProductContext } from '../contexts/ProductContextProvider'

const Cart = () => {
      const { productList } = useContext(ProductContext);
      const [modal, setModal] = useState(false);
      const [compareList, setCompareList] = useState([])
      let debounceID = null
      const toggle = () => setModal(!modal);

        const getProductComparison = async () => {
          let res = await fetch(`/api/cart/shopping`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productList)
          });
          res = await res.json()
          if(res.length > 0){
            setCompareList(res)
          }
        };

          const debounceHelper = () => {
            if (debounceID !== null) {
              clearTimeout(debounceID);
              debounceID = null;
            }
            debounceID = setTimeout(() => {
              getProductComparison()
            }, 250);
          };

    return (
      <div>
        <Button color="warning" onClick={toggle}>
          Kundvagn
        </Button>
        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle} charCode="" className="mx-auto">Kundvagn</ModalHeader>
          <ModalBody>
            {productList.length > 0 ? <ProductData products={productList}/> : <h4 className="text-center">Tom kundvagn</h4>}
            </ModalBody>
          <ModalFooter>
            <Button color="warning" className="mr-auto" onClick={() => debounceHelper()}>Jämför</Button>
            <Button color="primary">Köp</Button>{" "}
            <Button color="success">Stäng</Button>
          </ModalFooter>
          {compareList.length > 0 ? <ProductData products={compareList}/> : null}
        </Modal>
      </div>
    );
}
export default Cart