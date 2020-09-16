import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProductData from './ProductData'
import { ProductContext } from '../contexts/ProductContextProvider'

const Cart = () => {
       const { productList } = useContext(ProductContext);
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);

        const getProductComparison = async () => {
          let res = await fetch(`/api/cart/shopping`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productList)
          });
          res = await res.json()
          console.log(res);
          console.log(productList);
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
            <Button color="warning" className="mr-auto" onClick={() => getProductComparison()}>Jämför</Button>
            <Button color="primary">Köp</Button>{" "}
            <Button color="success">Stäng</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}
export default Cart