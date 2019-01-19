import React from 'react';
import Game from './game';

const games = [
    {
        home: 'Lynx',
        away: 'Sky',
        status: 'Upcoming',
        scheduled: 'May 25'
    }
]

const Main = () => {
    return (
        <div>
            {games.map((game) => {
                return <Game {...game} />
            })}
        </div>
    );
}

export default Main;