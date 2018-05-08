import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PercentsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemValue: props.item.percent
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      itemValue: nextProps.item.percent.toString()
    }
  }

  inputChangeHandler = (value) => {
    const { onItemChange, itemIndex } = this.props;
    const regexp = /^$|^\d+([.,]\d{0,2})?$/;

    value = value.replace(',', '.');

    if (!regexp.test(value) || +value > 100) return;
    if (value.charAt(value.length - 1) === '.') {
      this.setState({
        itemValue: value
      });
    } else {
      this.setState({
        itemValue: value
      }, onItemChange(itemIndex, +value));
    }
  };

  render() {
    const { item } = this.props;
    const { itemValue } = this.state;

    return (
      <li className='percent-list-item'>
        <span className='percent-list-item__name'>{item.name}</span>
        <input className='percent-list-item__slider'
               type='range'
               min='0'
               max='100'
               value={+itemValue}
               onChange={(event) => {
                 //event.preventDefault();
                 this.inputChangeHandler(event.target.value)
               }}
               step='0.01' />

        <input type='text'
               value={itemValue}
               onChange={(event) => {
                 //event.preventDefault();
                 this.inputChangeHandler(event.target.value)
               }}
               className='percent-list-item__input' />
      </li>
    );
  }
}

PercentsListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  itemIndex: PropTypes.number.isRequired,
  onItemChange: PropTypes.func.isRequired
};

export default PercentsListItem;
