const Model = require('../models/Model.js')
const util = require('../util.js')

const TAG = 'requests.NewStore';
module.exports = (password,passwordConfirm,callback) => {
  util.log(TAG,'password=',password,', passwordConfirm=',passwordConfirm);
  $.ajax('api.php',{
    method:'POST',
    dataType:'json',
    data:{
      action:'create',
      password:password,
      password_confirm:passwordConfirm
    },
    success:(data,textState,xhr) => {
      util.log(TAG,'response=',data);
      if(callback) {
        callback(data);
      }
    }
  })
}
