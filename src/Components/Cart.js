import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProductList from './ProductList'

const Cart = () => {
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);

      let cartProducts = ProductList()

    return (
      <div>
        <Button color="warning" onClick={toggle}>
          Kundvagn
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} charCode="" className="mx-auto">Kundvagn</ModalHeader>
          <ModalBody>{cartProducts}</ModalBody>
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