import React from 'react';
import PropTypes from 'prop-types';
import './statistic.css';

const statistic = (props) => {
  const { percentsDistributionItems } = props;

  const statisticItems = percentsDistributionItems.map((item, index) => {
    return (
      <li key={index}>{item.name} : {item.percent} %</li>
    );
  });

  let sum = 0;
  percentsDistributionItems.forEach((item) => sum += item.percent);
  sum = parseFloat(sum).toFixed(2);

  return (
    <div className='statistic'>
      <ul className='statistic-list'>
        {statisticItems}
      </ul>
      <p>Sum: {sum} %</p>
    </div>
  );
};

statistic.propTypes = {
  percentsDistributionItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired
    }),
  ).isRequired,
};

export default statistic;
