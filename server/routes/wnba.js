require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');

const withinRange = (game, range) => {
    const gameDate = new Date(game.scheduled);
    const today = new Date();
    const minDate = new Date().setDate(new Date().getDate() - range);
    return gameDate < today && gameDate > minDate;
}

const withinPointSpread = (game, pointSpread) => {
    return Math.abs(game.home_points - game.away_points) <= pointSpread
}

const getGoodGames = (games, range, pointSpread) => {
    return games.filter(game => withinRange(game, range) && withinPointSpread(game, pointSpread))
}

// This function is not needed for the main functionality we're going for.
// It just returns games that are happening today.
const gamesToday = (games) => {
    return games.filter((game) => {
        const gameDate = new Date(game.scheduled);
        const today = new Date();
        return gameDate.getDate() === today.getDate() && gameDate.getMonth() === today.getMonth();
    })
}

router.get('/', (req, res) => {
    request(`https://api.sportradar.us/wnba/trial/v4/en/games/2018/REG/schedule.json?api_key=${process.env.API_KEY}`, (error, response, body) => {
        console.log('error:', error);
        console.log('body:', body);
        const goodGames = getGoodGames(body.games, 7, 10)
    });
})

module.exports = router;