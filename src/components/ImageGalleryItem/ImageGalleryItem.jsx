import React, { Component } from 'react';
import style from './imageGalleryitem.module.css';
import Modal from '../Modal/Modal';
// import { Item, Img } from './img.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  // }) => {
  state = {
    isOpen: false,
    modalImage: '',
    imageAlt: [],
  };
  toggleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  handleModal = (largeImageURL, tags) => {
    this.setState({
      modalImage: largeImageURL,
      imageAlt: tags,
    });
    this.toggleModal();
  };

  render() {
    const { isOpen } = this.state;
    const { images } = this.props;

    return (
      <>
        {images.map(image => (
          <li
            key={image.id}
            className={style.ImageGalleryItem}
            onClick={() => {
              this.handleModal(image.largeImageURL, image.tags);
            }}
          >
            <img
              className={style.ImageGalleryItemImage}
              src={image.webformatURL}
              alt={image.tags}
            />
            {isOpen && (
              <Modal
                modalImage={this.state.modalImage}
                imageAlt={this.state.imageAlt}
                onClose={this.toggleModal}
              />
            )}
          </li>
        ))}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  // handleModal: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
