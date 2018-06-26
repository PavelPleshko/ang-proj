module.exports.init = initModels;

function initModels(app) {
  let modelsPath = app.get('root') + '/app/models/';

  ['token','profile','user','post','category','tag'].forEach(function(model) {
    require(modelsPath + model);
  });
};