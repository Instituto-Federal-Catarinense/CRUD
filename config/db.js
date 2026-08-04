// MySQL connection disabled - application uses local JSON file storage (config/storage.js)
module.exports = {
    query: (query, params, callback) => {
        console.warn('DB query called, but MySQL is disabled in favor of JSON storage.');
        if (typeof params === 'function') callback = params;
        if (callback) callback(null, []);
    }
};
