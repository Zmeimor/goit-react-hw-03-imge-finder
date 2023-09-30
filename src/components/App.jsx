import fetchPictures from './API/api';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import style from './Searchbar/searchbar.module.css';
import { useState, useEffect } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App () {
  const [showButton, setShowButton] = useState(false);
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);

useEffect(() => {
  setError(false);
  if (imageName === '') {
    return;
  }
  try {   
  
   fetchPictures(imageName, page) 
   .then(pictures => {
   
          if (pictures.hits.length < 1) {
            
              setShowButton(false);
              setStatus(Status.IDLE);
            return alert('No images on your query');
          }
          setImages((prevstate)=>([...prevstate, ...pictures.hits]));
          setShowButton(page < Math.ceil(pictures.total / 12) ? true : false);
      })
    } catch (error) {
          setError(true);
        }
      finally {
          setStatus(Status.RESOLVED);
        };
      
      }, [imageName, page])
      

      const handleFormSubmit = (e) => {
    if (e === imageName & page === 1) {
      return;
    }
      setImageName(e);
  
      setPage(1);
      setImages([]);
      setShowButton(false);
  };

  const loadMoreImages = () => {

   setPage(page + 1);
  };

    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'idle' && (
          <h2 className={style.EmptySearch}>Search something!</h2>
        )}

        {status === 'pending' && <Loader />}

        {images.length > 0 && <ImageGallery images={images}  error={error}/>}

        {showButton && <Button onClick={loadMoreImages} />}
      </>
    );
  }
  export default App;
