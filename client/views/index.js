import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                Hey my good friends
            </div>
        )
    }
}

const root = document.getElementById('app');
ReactDOM.render(<App/>, root);