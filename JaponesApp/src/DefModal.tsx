import React from 'react';
import Modal from 'react-modal';

function WordModal({ word, definition, isOpen, closeModal, className }) {
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