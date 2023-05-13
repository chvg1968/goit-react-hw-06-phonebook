import { Component } from 'react';

class Storage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usedStorage: 0,
      totalStorage: 1000,
    };
  }

  componentDidMount() {
    this.updateStorageUsage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.usedStorage !== this.state.usedStorage) {
      this.updateStorageUsage();
    }
  }

  updateStorageUsage = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const usedStorage = JSON.stringify(contacts).length;
    this.setState({ usedStorage });
  };

  render() {
    const { usedStorage, totalStorage } = this.state;
    const percentageUsed = ((usedStorage / totalStorage) * 100).toFixed(2);

    return (
      <div className="storage">
        <div className="storage-bar" style={{ width: `${percentageUsed}%` }}>
          {percentageUsed}% used
        </div>
      </div>
    );
  }
}

export default Storage;
