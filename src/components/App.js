import React, { Component } from 'react';
import axios from 'axios';
import Modal from './Modal/Modal'
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Load from './Loader/Loader';
import '../stylesheets/normalize.css';
import '../stylesheets/main.css';
import { ToastContainer } from "react-toastify";

class App extends Component {
  state = {
    photos: [],
    searchQuery: '',
    page: 1,
    showModal: false,
    loading: false,
    key: '19150755-18ebc4fb910ab3d1add5e1d5a',
    url: 'https://pixabay.com/api/',
    error: null,
    status: "idle",
  };
  
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`${this.state.url}?page=${this.state.page}&key=${this.state.key}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => this.setState({ photos: response.data.hits }))
      .catch(error=> this.setState({error}))
      .finally(() => this.setState({ loading: false }));
  };

  componentDidUpdate(prevProps, prevState) {
    const nextSearch = this.state.searchQuery;
    const prevSearch = prevState.searchQuery;
    const nextPage = this.state.page;
    const prevPage = prevState.page;

    if (nextSearch !== prevSearch) {
      this.setState({ loading: true, photos: []});
      
      axios
          .get(`${this.state.url}?q=${this.state.searchQuery}&page=${this.state.page}&key=${this.state.key}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => this.setState({ photos: response.data.hits }
          ))
          .catch(error=> this.setState({error}))
          .finally(() => this.setState({ loading: false }));
      
    }
    if (nextPage !== prevPage) {
      this.setState({ loading: true });

        axios
          .get(`${this.state.url}?q=${this.state.searchQuery}&page=${this.state.page}&key=${this.state.key}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => this.setState({ photos: [...prevState.photos, ...response.data.hits] }))
          .catch(error=> this.setState({error}))
          .finally(() => { this.setState({ loading: false }); window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth', }) });
    }
  };

  toggleModal = (largeImageURL) => {
    this.setState(({ showModal }) => ({showModal: !showModal}));
    this.setState({ largeImage: largeImageURL });
  };

  onButtonClick = e => {
    e.preventDefault();
    this.setState(
      { page: this.state.page + 1 }
    );
  };

  handleSearchSubmit = searchQuery => {
    const normalizedSearchQuery = searchQuery.toLowerCase().trim();
    this.setState({ searchQuery: normalizedSearchQuery });
   };
 
  render() {
    const { photos, showModal, largeImage, tags, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit}/> 
        {error && <h1>Error, try again later</h1>}
       
        {photos.length > 0 ?
          <ImageGallery
              photos={photos}
              onClick={this.toggleModal}>
          </ImageGallery> : null}
        
        {showModal &&
          <Modal onClose={this.toggleModal}>
          <img src={largeImage} alt={tags}/>
          </Modal>}

        {this.state.loading &&
          <Load 
          type="ThreeDots"
          color="#3f51b5"
          height={45}
          width={45}
          timeout={6000}
          />}
      
        {photos.length >= 11 ?
          <Button
            aria-label='Load more'
            onClick={this.onButtonClick}>
          </Button> : null}

        <ToastContainer autoClose={2000}/>
      </>
    );
  }
}

export default App;