import { useEffect } from 'react';
import { Overlay, ModalDiv } from './modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

function Modal ({onClose, modalImage, imageAlt}) {

  useEffect (()=>{
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },)
  
 function  handleKeyDown  (event) {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  function handleBackdropClick(e) {
    e.target === e.currentTarget && onClose();
  }

    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalDiv>
          <img src={modalImage} alt={imageAlt} /> 
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }

export default Modal;
