import React from 'react';
import './app.css';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';
import CreateElement from './components/CreateElement';
import FComponent from './components/FComponent';

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Comp1/>
                <Comp2/>
                <CreateElement/>
                <FComponent/>
            </div>
        );
    }
}