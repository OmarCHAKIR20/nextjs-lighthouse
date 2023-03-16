import Modal from 'react-modal';


Modal.setAppElement('#__next');

export default function CodeSampleModal({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
     
      contentLabel="Code Sample"
    >
      <p>Wonder no more!</p>
      
        {`function printHelloWorld() { \n  console.log('Hello World!'); \n}`}
    
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
}
