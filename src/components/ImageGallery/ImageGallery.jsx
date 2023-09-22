import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import style from './imageGallery.module.css';
// import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  return (
    <section>
      <h2 className="visually-hidden">gallery section</h2>
      <ul className={style.ImageGallery}>
        <ImageGalleryItem images={images} />
      </ul>
    </section>
  );
};

// ImageGallery.propTypes = {
//   images: PropTypes.array.isRequired,
//   handleModalImage: PropTypes.func.isRequired,
//   handleModalAlt: PropTypes.func.isRequired,
//   toggleModal: PropTypes.func.isRequired,
// };

export default ImageGallery;
