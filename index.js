// for ecmascript 5
require("babel-polyfill");
var _ = require('lodash');
Object.assign = _.assign;

// for material ui
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

// derp
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');

var PasswordAppForm = require('./components/PasswordAppForm.js')
var PasswordStore = require('./models/Model.js')
require('./requests/SetStorePassword.js')

ReactDOM.render(
  <ReactRedux.Provider store={PasswordStore}>
    <PasswordAppForm
        secretKey={PasswordStore.getState().key.value} 
        entry={PasswordStore.getState().entry}
        entries={PasswordStore.getState().entries}/>
  </ReactRedux.Provider>,
  document.getElementById('password-app')
)
