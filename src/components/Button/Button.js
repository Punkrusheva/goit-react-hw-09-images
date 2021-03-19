import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ children, onClick, ...allyProps }) => (
    <button type="button" className={styles.button} onClick={onClick} {...allyProps}>
    Load more{children}
  </button>
);

Button.defaultProps = {
  onClick: () => null,
  children: null,
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default Button;