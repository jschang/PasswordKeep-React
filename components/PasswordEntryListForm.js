require("babel-polyfill");
var React = require('react');
var ReactRedux = require('react-redux');
var Redux = require('redux');

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

var Model = require('../models/Model.js');

class PasswordEntryListForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {searchField:'username',searchValue:'',entries:null}
    this.state = { selectedIndex: -1 }
  }

  handleUpdateSelectedIndex(e,index) {
    console.log('PasswordEntryListForm.handleUpdateSelectedIndex: ',e,index)
    var entry = Object.assign({},Model.getState().entries[index]);
    Model.dispatch({type:'SET_ENTRY','entry':Object.assign({},entry),'index':index});
  }

  render() {
    console.log('PasswordEntryListForm.render: props=',this.props,' state=',this.state)

    var list = [];
    var props = this.props;
    var state = this.state;
    var self = this;
    if(props.entries) {
      props.entries.map(function(entry,index,entries) {
        if(entry[props.searchField].match(props.searchValue)) {
          list.push(
            <ListItem
              key={'pwk_ei_'+index}
              id={'pwk_ei_'+index}
              style={Model.getState().css.listItem}
              onTouchTap={function(evt){self.handleUpdateSelectedIndex(evt,index)}}
              primaryText={entry[props.searchField]} />
          )
        }
      });
    }
    return (<List style={Model.getState().css.list}>{list}</List>)
  }
}

PasswordEntryListForm = ReactRedux.connect(
// map redux state to props
(state,props) => {
  return {entries:state.entries};
})(PasswordEntryListForm);

module.exports = PasswordEntryListForm
