import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './percentsDistributor.css';

// Components.
import PercentsList from './percentsList/percentsList.container';
import SimpleButton from '../button/button';
import Statistic from './statistic/statistic';

class PercentsDistributor extends Component {
  componentDidMount() {
    const { fetchPercentsDistribution } = this.props;
    fetchPercentsDistribution();
  }

  addNewPercentItemHandler = () => {
    const { addPercentItem } = this.props;
    addPercentItem();
  };

  render() {
    const { percentsDistributionItems } = this.props;

    return (
      <div className='percents-distributor'>
        <h3>This is a Percents Distributor component</h3>
        <SimpleButton onClickHandler={this.addNewPercentItemHandler} />
        <PercentsList percentsDistributionItems={percentsDistributionItems} />
        <hr/>
        <Statistic percentsDistributionItems={percentsDistributionItems} />
      </div>
    );
  }
}

PercentsDistributor.propTypes = {
  percentsDistributionItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired
    }),
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.any.isRequired,
  fetchPercentsDistribution: PropTypes.func.isRequired,
  addPercentItem: PropTypes.func.isRequired
};

export default PercentsDistributor;
