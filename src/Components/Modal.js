import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import { ProductContext } from '../contexts/ProductContextProvider'


const ProductModal = () => {
  const {productInfo, getProductInfo} = useContext(ProductContext)
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="warning" onClick={toggle}>Open Modal</Button>
      <Modal isOpen={modal} toggle={toggle} size="lg" onClick={toggle}>
        <ModalHeader toggle={toggle} charCode="" className="mx-auto">
          <h4>{productInfo.productName}</h4>
        </ModalHeader>
        <ModalBody>
          <p>Product description goes here...</p>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default ProductModal