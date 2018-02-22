var axios = require('axios');

const headers = {
    headers: {
        'Content-Type': 'application/json',
    }
};

module.exports = getFromAxios = async (url) => {
    const response = await axios.get(url, headers);
    return response
};
