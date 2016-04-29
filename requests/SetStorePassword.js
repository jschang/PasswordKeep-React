var Model = require('../models/Model.js')

var lastKeyValue = '';
Model.subscribe(()=>{
  var state = Model.getState();
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
        var Model = require('../models/Model.js')
        if(!data) {
          Model.dispatch({
            type:'SERVICE_MESSAGE',
            message:"Unable to retrieve JSON from the server"
          })
          return;
        }
        if(data.error && data.message) {
          Model.dispatch({
            type:'SERVICE_MESSAGE',
            message:data.message
          })
        } else if(data.entries.length) {
          Model.dispatch({
            type:'ADD_ENTRIES',
            entries:data.entries
          })
        }
      }
    })
  }
})
