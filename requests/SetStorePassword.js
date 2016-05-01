const Model = require('../models/Model.js')
const util = require('../util.js')

const TAG = 'requests.SetStorePassword';

var lastKeyValue = '';
Model.subscribe(()=>{
  const state = Model.getState();
  if(state.key.value!=lastKeyValue) {
    lastKeyValue = state.key.value;
    Model.dispatch({
      type:'CLEAR_ENTRIES'
    })
    $.ajax('api.php',{
      method:'POST',
      dataType:'json',
      data:{
        action:'fetch',
        password:lastKeyValue
      },
      success:(data,textState,xhr) => {
        const Model = require('../models/Model.js')
        util.log(TAG,'response=',data);
        if(!data) {
          Model.dispatch({
            type:'SERVICE_MESSAGE',
            message:"Unable to retrieve JSON from the server"
          })
          Model.dispatch({
            type:'SET_STORE_PASSWORD',
            value:null
          })
          return;
        }
        if(data.error && data.message) {
          Model.dispatch({
            type:'SERVICE_MESSAGE',
            message:data.message
          })
          Model.dispatch({
            type:'SET_STORE_PASSWORD',
            value:null
          })
        } else if(data.entries.length) {
          Model.dispatch({
            type:'STORE_PASSWORD_ACCEPTED'
          })
          Model.dispatch({
            type:'ADD_ENTRIES',
            entries:data.entries
          })
        }
      }
    })
  }
})
