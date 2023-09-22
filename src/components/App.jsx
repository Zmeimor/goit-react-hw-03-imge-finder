import { Component } from 'react';
import fetchPictures from './API/api';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import style from './Searchbar/searchbar.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    showButton: false,
    status: Status.IDLE,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      fetchPictures(nextName, this.state.page)
        // .then(images => console.log(images))
        .then(pictures => {
          if (pictures.hits.length < 1) {
            this.setState({
              showButton: false,
              status: Status.IDLE,
            });
            return alert('No images on your query');
          }
          // console.log(images);
          this.setState(prevState => ({
            images: [...prevState.images, ...pictures.hits],
            showButton:
              this.state.page < Math.ceil(pictures.total / 12) ? true : false,
          }));
        })
        .catch(err => {
          this.setState({ error: err.message });
        })
        .finally(() => {
          this.setState({
            status: Status.RESOLVED,
          });
        });
    }
  }

  handleFormSubmit = imageName => {
    if (imageName === this.state.imageName) {
      return;
    }

    this.setState({
      imageName,
      page: 1,
      images: [],
      showButton: false,
      isOpen: false,
      status: Status.IDLE,
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status, showButton } = this.state;

    const { handleFormSubmit, loadMoreImages } = this;

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
}
