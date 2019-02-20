import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import TopicTable from './output/TopicTable';

class App extends Component {
  render() {
    return (
        <div className='something' style={{ width: '100vw', height: '100vh' }}>
          <div className='view-row'>
            <div className='view'>
              <TopicTable/>
              <div className='test'></div>
            </div>
            <div className='view'>
              <div className='test'>2</div>
            </div>
          </div>
          <div className='view-row'>
            <div className='view'>
              <div className='test'>3</div>
            </div>
            <div className='view'>
              <div className='test'>4</div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
