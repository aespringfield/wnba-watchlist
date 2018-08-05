const express = require('express');
const router = express.Router();

const schedule = require('../assets/schedule.json')

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

const goodGames = getGoodGames(schedule.games, 7, 10)

router.get('/', (req, res) => {

})

module.exports = router;