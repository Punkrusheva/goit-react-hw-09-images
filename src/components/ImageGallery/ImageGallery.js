
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ photos, onClick } ) {
    return (
      <ul className={styles.imageGallery}>
        {photos.map(( photo ) => (<ImageGalleryItem key={photo.id} onClick={() => onClick(photo)}
          photo={photo}
          ></ImageGalleryItem>))}
      </ul> 
    )
}
        
ImageGallery.defaultProps = {
  photos: [],
  children: "",
};

ImageGallery.propTypes = {
  photos: PropTypes.array,
  children: PropTypes.node,
};

export default ImageGallery;