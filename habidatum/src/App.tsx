// import { Layout } from 'antd';
import * as React from 'react';
import TripViewer from './TripViewer';

import './App.css';

// const { Content } = Layout;

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <TripViewer />
      </div>
    );
  }
}

export default App;
