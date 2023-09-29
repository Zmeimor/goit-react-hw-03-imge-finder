// import { Component } from 'react';
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
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
 



// export default class App extends Component {
//   state = {
//     imageName: '',
//     images: [],
//     page: 1,
//     showButton: false,
//     status: Status.IDLE,
//     error: null,
//   };

  
  // componentDidUpdate(_, prevState) {
    // const prevName = prevState.imageName;
    // const nextName = this.state.imageName;

    // const prevPage = prevState.page;
//     // const nextPage = this.state.page;

//     if (prevState.imageName !== nextNthis.state.imageNameame || prevPage !== nextPage) {
//       this.setState({ status: Status.PENDING });
// }
useEffect(() => {
  if (imageName === '') {
    return;
  }
  try {
  fetchPictures(imageName, page)
        // .then(images => console.log(images))
        .then(pictures => {
          if (pictures.hits.length < 1) {
            
              setShowButton(false);
              setStatus(Status.IDLE);
            return alert('No images on your query');
          }
          setImages([ ...pictures.hits]);
          setShowButton(page < Math.ceil(pictures.total / 12) ? true : false);
    
        })
      } catch (error) {
          setError(true);
          console.log(true);
        }
      finally {
          setStatus(Status.RESOLVED);
        };
      }, [imageName, page]
      )

      const handleFormSubmit = (e) => {
    if (e === imageName & page === 1) {
      return;
    }
    // console.log(e);
      setImageName(e);
  
      setPage(1);
      setImages([]);
      setShowButton(false);
      // setStatus(Status.IDLE);
      // console.log({status,imageName});
      // isOpen: false,
  };

  const loadMoreImages = () => {

   setPage( page + 1);
  };

  // render() {
    // const { images, status, showButton } = this.state;

    // const { handleFormSubmit, loadMoreImages } = this;

    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'idle' && (
          <h2 className={style.EmptySearch}>Search something!</h2>
        )}

        {status === 'pending' && <Loader />}

        {images.length > 0 && <ImageGallery images={images} />}

        {showButton && <Button onClick={loadMoreImages} />}
      </>
    );
  }
  export default App;
