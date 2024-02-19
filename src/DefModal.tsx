import Modal from 'react-modal';

interface ModalProps {
    word: string
    definition: string
    isOpen: boolean
    closeModal: (any)
    className: string
    onAddWord: (any) 
}

function WordModal({ word, definition, isOpen, closeModal, className, onAddWord }: ModalProps ) {
    return (
      <Modal
        className={className}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Word Definition Modal"
      >
        <h2>Word Definition: {word}</h2>
        <p>{definition}</p>
        <button onClick={onAddWord}>Add word</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    );
  }
  
  export default WordModal;