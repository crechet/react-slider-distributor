import { connect } from 'react-redux';
import PercentsDistributor from './percentsDistributor';

import { fetchPercentsDistribution, addPercentItem } from '../../actions/percentsDistributionActions';

const mapStateToProps = state => {
  return {
    percentsDistributionItems: state.percentsDistribution.items,
    isFetching: state.percentsDistribution.isFetching,
    error: state.percentsDistribution.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPercentsDistribution: () => dispatch(fetchPercentsDistribution()),
    addPercentItem: () => dispatch(addPercentItem())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PercentsDistributor);
