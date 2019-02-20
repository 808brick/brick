import React, { Component } from 'react';
import logo from '../logo.svg';
// Possibly change for custom css stylesheet
// import './App.css';
import { Table, Header, Button } from 'semantic-ui-react';

class TopicTable extends Component {
  render() {
    return (
        <div>
            <Table center celled style={{textAlign: 'center'}}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Topic</Table.HeaderCell>
                  <Table.HeaderCell>Value</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell><Header>GPS</Header></Table.Cell>
                  <Table.Cell>(345, 54, 8897)</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Header>Velocity</Header></Table.Cell>
                  <Table.Cell>12</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Header>Direction</Header></Table.Cell>
                  <Table.Cell>13 degrees</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Header>Raymond</Header></Table.Cell>
                  <Table.Cell>sucks</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

          <Button basic color='teal' size='small' style={{marginLeft: '10px', marginRight: '10px'}}>Delete Topic</Button>
          <Button color='teal' size='small'>Add Topic</Button>

        </div>
    );
  }
}

export default TopicTable;
