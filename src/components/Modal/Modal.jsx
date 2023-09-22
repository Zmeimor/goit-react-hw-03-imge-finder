import { Component } from 'react';
// import PropTypes from 'prop-types';
import { Overlay, ModalDiv } from './modal.styled';
import { createPortal } from 'react-dom';
// import style from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImage, imageAlt } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalDiv>
          <img src={modalImage} alt={imageAlt} />
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}

// Modal.propTypes = {
// modalImage: PropTypes.string.isRequired,
// imageAlt: PropTypes.string.isRequired,
// onClose: PropTypes.func.isRequired,
// };

export default Modal;
