const Model = require('../models/Model.js')
const util = require('../util.js')

const TAG = 'requests.FetchStore';

const request = module.exports = function(password,callback) {
  Model.dispatch({type:'CLEAR_ENTRIES'})
  $.ajax('api.php',{
    method:'POST',
    dataType:'json',
    data:{
      action:'fetch',
      password:password
    },
    success:(data,textState,xhr) => {
      const Model = require('../models/Model.js')
      util.log(TAG,'response=',data);
      if(!data) {
        const msg = "Unable to retrieve JSON from the server";
        Model.dispatch({type:'SERVICE_MESSAGE',message:msg})
        Model.dispatch({type:'STORE_PASSWORD_REJECTED'})
        Model.dispatch({type:'SET_STORE_PASSWORD',value:null})
      } else {
        if(data.error && data.message) {
          Model.dispatch({type:'SERVICE_MESSAGE',message:data.message})
          Model.dispatch({type:'STORE_PASSWORD_REJECTED'})
        } else if(data.entries) {
          Model.dispatch({type:'STORE_PASSWORD_ACCEPTED'})
          Model.dispatch({type:'ADD_ENTRIES',entries:data.entries})
        } else if(data.newStore) {
          Model.dispatch({type:'STORE_UNCREATED'})
        }
      }
      if(callback) {
        callback(data);
      }
    }
  })
}

