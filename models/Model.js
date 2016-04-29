var redux = require('redux');

module.exports = redux.createStore(
  redux.combineReducers(
    {
      css:function(state, action) {
        if(!state) return require('./Css.js')
        return state;
      },
      /**
       * { type: SET_STORE_PASSWORD, value: 'somevalue' }
       */
      key:function(state, action) {
        console.log('model.key: state=',state,', action=',action)
        if(!state) return {value:null};
        var ret = state;
        if(action.type=='SET_STORE_PASSWORD')
          ret = Object.assign({},state,{value:action.value});
        console.log('model.key: new state=',ret)
        return ret;
      },
      /*
       * { type: SERVICE_MESSAGE, message: 'message to display' }
       */
      serviceMessage:function(state, action) {
        console.log('model.serviceMessage: state=',state,', action=',action)
        if(!state) return '';
        var ret = state;
        if(action.type=='SERVICE_MESSAGE')
          ret = action.message;
        return ret;
      },
      /**
       * { type: SET_FILTER, value: 'somevalue' }
       */
      filter:function(state, action) {
        console.log('model.filter: state=',state,', action=',action);
        if(!state) return '';
        if(action.type=='SET_FILTER')
          return action.value;
        return state;
      },
      entry:function(state, action) {
        console.log('model.entry: state=',state,', action=',action);
        if(!state) return {entry:null,index:null};
        if(action.type=='SET_ENTRY') {
          return {entry:action.entry,index:action.index};
        }
        if(action.type=='CLEAR_ENTRY') {
          return {entry:null,index:null};
        }
        return state;
      },
      /**
       * { type: CLEAR_ENTRIES }
       * { type: NEW_ENTRY }
       * { type: REMOVE_ENTRY, index: 2 }
       * { type: EDIT_ENTRY, index: 2, entry: {username:null,password:null,description:null,url:null} }
       */
      entries:function(state, action) {
        console.log('model.entries: state=',state,', action=',action);
        if(!state) return [];
        if(action.type=='CLEAR_ENTRIES') {
          var ret = [];
          return ret;
        }
        if(action.type=='ADD_ENTRIES') {
          var ret = action.entries;
          return ret;
        }
        if(action.type=='NEW_ENTRY') {
          var ret = [];
          Array.prototype.push.apply(ret,state);
          ret.push({
            'username':null,
            'password':null,
            'description':null,
            'url':null
          })
          return ret;
        }
        if(action.type=='SAVE_ENTRY') {

        }
        if(action.type=='REMOVE_ENTRY') {
          var ret = [];
          Array.prototype.push.apply(ret,state);
          ret.splice(action.index,1)
          return ret;
        }
        if(action.type=='EDIT_ENTRY') {
          var ret = [];
          Array.prototype.push.apply(ret,state);
          ret[action.index] = action.entry;
          return ret;
        }
        return state;
      }
    }
  )
)
