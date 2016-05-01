const util = require('../util.js');
const redux = require('redux');

const TAG = 'models.Model';

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
        util.log(TAG+'.key','state=',state,', action=',action)
        if(!state) return {value:null,accepted:false};
        var ret = state;
        if(action.type=='SET_STORE_PASSWORD')
          ret = Object.assign({},state,{value:action.value});
        if(action.type=='STORE_PASSWORD_ACCEPTED')
          ret = Object.assign({},state,{accepted:true});
        if(action.type=='STORE_PASSWORD_REJECTED')
          ret = Object.assign({},state,{accepted:false});
        util.log(TAG+'.key','new state=',ret)
        return ret;
      },
      /**
       * { type: SERVICE_MESSAGE, message: 'message to display' }
       */
      serviceMessage:function(state, action) {
        util.log(TAG+'.serviceMessage','state=',state,', action=',action)
        if(state===null || typeof(state)=='undefined') return '';
        var ret = state;
        if(action.type=='SERVICE_MESSAGE') {
          ret = action.message;
        }
        if(action.type=='CLEAR_SERVICE_MESSAGE') {
          ret = '';
        }
        return ret;
      },
      /**
       * { type: SET_FILTER, value: 'somevalue' }
       */
      filter:function(state, action) {
        util.log(TAG+'.filter','state=',state,', action=',action);
        if(!state) return 'url';
        if(action.type=='SET_FILTER')
          return action.value;
        return state;
      },
      entry:function(state, action) {
        util.log(TAG+'.entry','state=',state,', action=',action);
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
        util.log(TAG+'.entries','state=',state,', action=',action);
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
