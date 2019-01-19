import React from 'react';

const Game = ({ home, away, scheduled, status }) => {
    return (
        <div class="game-card">
            <div class="game-header">
                <span>{away}</span> @ <span>{home}</span>
            </div>
            <div class="game-body">
                <div class="game-schedule">
                    {scheduled}
                </div>
                <div class="game-status">
                    {status}
                </div>
            </div>
        </div>
    );
}

export default Game;