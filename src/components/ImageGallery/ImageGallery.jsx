import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import style from './imageGallery.module.css';

const ImageGallery = ({ images, error }) => {
  return (
    <section>
      {error && <h2>{error}</h2>}
      <ul className={style.ImageGallery}>
        <ImageGalleryItem images={images} />
      </ul>
    </section>
  );
};

export default ImageGallery;
