import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Storage({ contacts }) {

const totalStorage = 1000;  
const usedStorage = JSON.stringify(contacts).length;
const percentageUsed = ((usedStorage / totalStorage) * 100).toFixed(2);

return (
  <div className="storage">
    <div className="storage-bar" style={{ width: `${percentageUsed}%` }}>
     {percentageUsed}% used
    </div>
  </div>
);
}

const mapStateToProps = (state) => ({
  contacts: state.contacts  
});

Storage.propTypes = {
  contacts: PropTypes.array.isRequired  
}

export default connect(mapStateToProps)(Storage);