// for ecmascript 5
require("babel-polyfill");
var _ = require('lodash');
Object.assign = _.assign;

// for material ui
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

// derp
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRedux = require('react-redux');

const PasswordAppForm = require('./components/PasswordAppForm.js')
const PasswordStore = require('./models/Model.js')

const fetchStore = require('./requests/FetchStore.js')

// whenever the key store changes,
// attempt to refetch the entries
var lastKeyValue = '';
PasswordStore.subscribe(()=>{
  const state = PasswordStore.getState();
  if(state.key.value!=lastKeyValue) {
    lastKeyValue = state.key.value;
    fetchStore(lastKeyValue);
  }
})

ReactDOM.render(
  <ReactRedux.Provider store={PasswordStore}>
    <PasswordAppForm
        secretKey={PasswordStore.getState().key.value} 
        entry={PasswordStore.getState().entry}
        entries={PasswordStore.getState().entries}/>
  </ReactRedux.Provider>,
  document.getElementById('password-app')
)
