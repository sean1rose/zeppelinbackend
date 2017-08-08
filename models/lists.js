module.exports = app => {
  return {
    findAll: (params, callback) => {
      return callback([
        {title: 'top5artistsatm'},
        {title: 'top5livesetssatm'}
      ]);
    }
  };
};