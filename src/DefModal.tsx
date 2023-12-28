import Modal from 'react-modal';

interface ModalProps {
    word: string
    definition: string
    isOpen: boolean
    closeModal: any
    className: string
}

function WordModal({ word, definition, isOpen, closeModal, className }:ModalProps) {
    return (
      <Modal
        className={className}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Word Definition Modal"
      >
        <h2>Definición de la palabra: {word}</h2>
        <p>{definition}</p>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    );
  }
  
  export default WordModal;