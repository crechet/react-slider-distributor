import { connect } from 'react-redux';
import PercentsList from './percentsList';

import { updatePercentDistribution } from '../../../actions/percentsDistributionActions';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => {
  return {
    updatePercentDistribution: (index, newValue) => dispatch(updatePercentDistribution(index, newValue))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PercentsList);
