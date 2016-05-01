require("babel-polyfill");
const React = require('react');
const ReactRedux = require('react-redux');
const Redux = require('redux');
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
      props.entries.map(function(entry,index,entries) {
        if(entry[props.searchField].match(props.searchValue)) {
          list.push(
            <Row key={'pwk_ei_'+index}>
              <Col xs={2}>
                <Button style={{width:'100%'}} 
                    onClick={(evt)=>{self.handleUpdateSelectedIndex(evt,index)}}>
                  Edit
                </Button>
              </Col>
              <Col xs={8}>
                <Panel>
                  {entry[props.searchField]}
                </Panel>
              </Col>
              <Col xs={2}>
                <Button style={{width:'100%'}}
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
