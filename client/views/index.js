import React from 'react';
import Main from './main.js'
import { renderToString } from 'react-dom/server';
// import ReactDOM from 'react-dom';

const App = ({ stylesheets=[], scripts=[] }) => {
    return (
        <html>
            <head>
                {stylesheets.map((stylesheet) => {
                    <link rel="stylesheet" href={stylesheet}/>
                })}
                {scripts.map((script) => {
                    <script type="text/javascript" src={script}/>
                })}
            </head>
            <body>
                <Main />
            </body>
        </html>
    )
}

const html = renderToString(<App />);
export default html;
// const root = document.getElementById('app');
// ReactDOM.render(<App/>, root);