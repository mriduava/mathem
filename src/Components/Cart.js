import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProductData from './ProductData'
import { ProductContext } from '../contexts/ProductContextProvider'

const Cart = () => {
       const { productList } = useContext(ProductContext);
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);


    return (
      <div>
        <Button color="warning" onClick={toggle}>
          Kundvagn
        </Button>
        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle} charCode="" className="mx-auto">Kundvagn</ModalHeader>
          <ModalBody><ProductData products={productList}/></ModalBody>
          <ModalFooter>
            <Button color="warning" className="mr-auto">Jämför</Button>
            <Button color="primary">Köp</Button>{" "}
            <Button color="success">Stäng</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}
export default Cart