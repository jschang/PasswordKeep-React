require("babel-polyfill");
const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');
const Clipboard = require('clipboard');

const util = require('../util.js');

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

const Model = require('../models/Model.js');

const TAG = 'components.PasswordEntryListForm';

const clipboard = new Clipboard('.copyable');
clipboard.on('success', function(e) {
  Model.dispatch({type:'SERVICE_MESSAGE',message:'Copied '+$(e.trigger).attr('data-type')+' to clipboard!'});
});
clipboard.on('error', function(e) {
  Model.dispatch({type:'SERVICE_MESSAGE',message:'Unable to copy to clipboard.  =('});
});

class PasswordEntryListForm extends React.Component {
  componentWillMount() {
    this.defaultProps = {searchField:'username',searchValue:'',entries:null}
    this.state = { selectedIndex: -1 }
  }

  handleUpdateSelectedIndex(evt,index) {
    util.log(TAG,'handleUpdateSelectedIndex: ',evt,index)
    var entry = Object.assign({},Model.getState().entries[index]);
    Model.dispatch({type:'SET_ENTRY','entry':Object.assign({},entry),'index':index});
  }

  handleDelete(evt,index) {
  }
  
  render() {
    
    util.log(TAG,'render: props=',this.props,' state=',this.state)

    var list = [];
    var props = this.props;
    var state = this.state;
    var self = this;
    
    if(props.entries) {
      var entries = props.entries.slice()
      entries.sort((l,r)=>{
           if(l[props.searchField].toLowerCase() > r[props.searchField].toLowerCase()) {
             return 1;
           } else if(l[props.searchField].toLowerCase() < r[props.searchField].toLowerCase()) {
             return -1;
           }
           return 0;
      });
      entries.map(function(entry,index,entries) {
        if(entry[props.searchField].match(props.searchValue)) {
          list.push(
            <Row key={'pwk_ei_'+index}>
              <Col xs={2}>
                <Button style={{width:'100%',height:'100%'}} 
                    onClick={(evt)=>{self.handleUpdateSelectedIndex(evt,index)}}>
                  Edit
                </Button>
              </Col>
              <Col xs={2}>
                <Button className={'copyable'} style={{width:'100%',height:'100%'}} 
                    data-type="username" data-clipboard-text={entry.username}>
                  Copy User
                </Button>
              </Col>
              <Col xs={2}>
                <Button className={'copyable'} style={{width:'100%',height:'100%'}} 
                    data-type="password" data-clipboard-text={entry.password}>
                  Copy Password
                </Button>
              </Col>
              <Col xs={4}>
                <Panel style={{overflow:'hidden'}}>
                  {entry[props.searchField]}
                </Panel>
              </Col>
              <Col xs={2}>
                <Button style={{width:'100%',height:'100%'}}
                    onClick={(evt)=>{self.handleDelete(evt,index)}}>Delete</Button>
              </Col>
            </Row>
          )
        }
      });
    }
    return (<Grid>{list}</Grid>)
  }
}

PasswordEntryListForm = ReactRedux.connect(
// map redux state to props
(state,props) => {
  //util.log(TAG,'mapStateToProps: props=',this.props,' state=',this.state)
  return {entries:state.entries};
})(PasswordEntryListForm);

module.exports = PasswordEntryListForm
