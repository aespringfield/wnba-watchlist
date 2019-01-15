import React from 'react';
import ReactDOM from 'react-dom';

console.log('floop')

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