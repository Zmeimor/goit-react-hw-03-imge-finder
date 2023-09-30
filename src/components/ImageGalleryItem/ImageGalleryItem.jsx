import React from 'react';
import style from './imageGalleryitem.module.css';
import Modal from '../Modal/Modal';
import { useState } from 'react';

export function ImageGalleryItem ({images}) {
  
  const [isOpen, setIsOpen]=useState(false);
  const [modalImage, setModalImage]=useState(false);
  const [imageAlt, setImageAlt]=useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

 const handleModal = (largeImageURL, tags) => {
  setModalImage (largeImageURL);
  setImageAlt(tags);
  toggleModal();
  };

    return (
      <>
        {images.map(image => (
          <li
            key={image.id}
            className={style.ImageGalleryItem}
            onClick={() => {
              handleModal(image.largeImageURL, image.tags);
            }}
          >
            <img
              className={style.ImageGalleryItemImage}
              src={image.webformatURL}
              alt={image.tags}
            />

          </li>
        ))}
    {isOpen && (
              <Modal
                modalImage={modalImage}
                imageAlt={imageAlt}
                onClose={toggleModal}
              />
            )}
      </>
    );
  }
