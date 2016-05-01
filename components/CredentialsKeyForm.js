require("babel-polyfill");
const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');
const util = require('../util.js');

import TextField from 'material-ui/lib/text-field';

const Model = require('../models/Model.js');
const TAG = 'components.CredentialsKeyForm';

class CredentialsKeyForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {value:''}
  }
  onKeyUp(evt) {
    if(evt.keyCode==13) {
      this.props.onEnterPressed(evt);
    }
  }
  render() {
    util.log(TAG,'render: props=',this.props,' state=',this.state)
    return (<TextField
      floatingLabelText="Credentials Store Key"
      style={Model.getState().css.key}
      id="storePasswordInput"
      type="password"
      onKeyUp={this.onKeyUp.bind(this)}/>)
  }
}

CredentialsKeyForm = ReactRedux.connect(
// map redux state to props
(state,props) => {
  util.log(TAG,'mapStateToProps: state=',state,', props=',props);
  return {value:state.key.value}
},{
  // map dispatchable events to props
  onEnterPressed: (evt) => {
    return {type:'SET_STORE_PASSWORD',value:evt.target.value}
  }
})(CredentialsKeyForm);

module.exports = CredentialsKeyForm
