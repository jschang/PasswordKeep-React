require("babel-polyfill");
const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');
const util = require('../util.js');

const Model = require('../models/Model.js');

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

const TAG = 'components.PasswordEntryForm';

class PasswordEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProps = {entry:null,entryIndex:null}
    this.state = {passwordTextType:"password",entry:props.entry}
  }
  onSaveTouched(evt) {
    var newEntry = Object.assign({},this.state.entry);
    Model.dispatch({type:'SAVE_ENTRY',entry:newEntry,index:this.props.entryIndex});
  }
  onChangeUrl(evt) {
    util.log(TAG,'onChangeUrl.value= ',evt.target.value)
    this.setState({entry:Object.assign({},this.state.entry,{
      url:evt.target.value
    })})
  }
  onChangeDescription(evt) {
    util.log(TAG,'onChangeDescription.value= ',evt.target.value)
    this.setState({entry:Object.assign({},this.state.entry,{
      description:evt.target.value
    })})
  }
  onChangeUsername(evt) {
    util.log(TAG,'onChangeUsername.value= ',evt.target.value)
    this.setState({entry:Object.assign({},this.state.entry,{
      username:evt.target.value
    })})
  }
  onChangePassword(evt) {
    util.log(TAG,'onChangePassword.value= ',evt.target.value)
    this.setState({entry:Object.assign({},this.state.entry,{
      password:evt.target.value
    })})
  }
  render() {
    util.log(TAG,'render: props=',this.props,' state=',this.state)
    const state = this.state;
    return (<div style={Model.getState().css.centerDiv}>
      <div>
      <FlatButton style={Model.getState().css.entryBackButton}
          label="Back" onClick={this.props.onBackTouched}/>
      <FlatButton style={Model.getState().css.entrySaveButton}
          label="Save" onClick={this.onSaveTouched}/>
      </div>
      <TextField
        floatingLabelText="URL"
        style={Model.getState().css.entryText}
        id={"entryURL_"+this.props.entryIndex}
        type="text"
        defaultValue={state.entry.url}
        onChange={this.onChangeUrl}/>
      <TextField
        floatingLabelText="Description"
        style={Model.getState().css.entryText}
        id={"entryDescription_"+this.props.entryIndex}
        type="text"
        defaultValue={state.entry.description}
        onChange={this.onChangeDescription}/>
      <TextField
        floatingLabelText="Username"
        style={Model.getState().css.entryText}
        id={"entryUsername_"+this.props.entryIndex}
        type="text"
        defaultValue={state.entry.username}
        onChange={this.onChangeUsername}/>
      <TextField
        floatingLabelText="Password"
        style={Model.getState().css.entryText}
        id={"entryPassword_"+this.props.entryIndex}
        type={state.passwordTextType}
        defaultValue={state.entry.password}
        onChange={this.onChangePassword}/>
    </div>)
  }
}

PasswordEntryForm = ReactRedux.connect(
// map redux state to props
(state,props) => {
  return {
    entry:state.entry.entry,
    entryIndex:state.entry.index
  };
},{
  onBackTouched:()=>{
    util.log(TAG,'back touched');
    return {type:'CLEAR_ENTRY'};
  }
})(PasswordEntryForm);

module.exports = PasswordEntryForm
