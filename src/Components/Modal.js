import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
  const {buttonLabel, className} = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
        <ModalBody>
          Display Product Description! ...
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;