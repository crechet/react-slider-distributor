import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles.
import './percentsList.css';

// Components.
import PercentsListItem from './percentsListItem/percentsListItem';

class PercentsList extends Component {
  itemChangeHandler = (index, newValue) => {
    const { updatePercentDistribution } = this.props;
    updatePercentDistribution(index, +newValue);
  };

  render() {
    const { percentsDistributionItems } = this.props;

    const items = percentsDistributionItems.map((item, index) => {
      return <PercentsListItem key={index}
                               item={item}
                               itemIndex={index}
                               onItemChange={this.itemChangeHandler} />
    });

    return (
      <ul className='percents-list'>
        {items}
      </ul>
    );
  }
}

PercentsList.propTypes = {
  percentsDistributionItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired
    }),
  ).isRequired,
  updatePercentDistribution: PropTypes.func.isRequired
};

export default PercentsList;
