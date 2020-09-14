import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Cart = () => {
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);

    return (
      <div>
        <Button color="danger" onClick={toggle}>
          Kundvagn
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Kundvagn</ModalHeader>
          <ModalBody>
            Kund produkter här
          </ModalBody>
          <ModalFooter>
            <Button color="primary">
              Köp
            </Button>{" "}
            <Button color="secondary">
              Stäng
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}
export default Cart