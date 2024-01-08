import { Modal } from 'react-bootstrap';

const Popup = ({ showModal, setShowModal, header, body }) => {

  return (
    <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {body}
        </Modal.Body>
      </Modal>
  );
}

export default Popup;