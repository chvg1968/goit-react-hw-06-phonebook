import { useState, useEffect } from 'react';

function Storage() {
const [usedStorage, setUsedStorage] = useState(0);
const totalStorage = 1000;

useEffect(() => {
updateStorageUsage();
}, [usedStorage]);

const updateStorageUsage = () => {
const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
const usedStorage = JSON.stringify(contacts).length;
setUsedStorage(usedStorage);
};

const percentageUsed = ((usedStorage / totalStorage) * 100).toFixed(2);

return (
<div className="storage">
<div className="storage-bar" style={{ width: `${percentageUsed}%` }}>
{percentageUsed}% used
</div>
</div>
);
}

export default Storage;