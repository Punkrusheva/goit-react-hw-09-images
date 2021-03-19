import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ photo, onClick }) {
    return (
    <>
      <li className={styles.item}
        onClick={onClick}>
        <img className={styles.image}
          src={photo.webformatURL}
          data-source={photo.largeImageURL}
          alt={photo.tags}/>
        </li>
        </>
  )
}

ImageGalleryItem.defaultProps = {
  largeImageURL: '',
  webformatURL: '',
  tags: '',
  id: ''
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
