import React from 'react';
import PropTypes from 'prop-types';

const simpleButton = (props) =>{
  const { onClickHandler } = props;

  const onButtonClickHandler = (event) => {
    event.preventDefault();
    onClickHandler()
  };

  return (
    <button onClick={onButtonClickHandler}>Добавить элемент</button>
  );
};

simpleButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired
};

export default simpleButton;
