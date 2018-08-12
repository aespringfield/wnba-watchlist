require('dotenv').config();

const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment-timezone');
moment.tz.setDefault('America/Chicago')

const withinRange = (game, range) => {
    const gameDate = moment(game.scheduled);
    const today = moment();
    const minDate = moment().subtract(range, 'days');
    return gameDate < today.endOf('day') && gameDate > minDate.startOf('day');
}

const withinPointSpread = (game, pointSpread) => {
    return Math.abs(game.home_points - game.away_points) <= pointSpread
}

const getGoodGames = (games, range, pointSpread) => {
    return games.filter(game => withinRange(game, range) && withinPointSpread(game, pointSpread))
}

// This function is not needed for the main functionality we're going for.
// It just returns games that are happening today.
const getGamesToday = (games) => {
    return games.filter((game) => {
        const gameDate = new Date(game.scheduled);
        const today = new Date();
        return gameDate.getDate() === today.getDate() && gameDate.getMonth() === today.getMonth();
    })
}

const getGamesTomorrow = (games) => {
    return games.filter((game) => {
        const gameDate = moment(game.scheduled);
        const today = moment()
        const tomorrow = moment().add(1, 'days')
        return gameDate > today.endOf('day') && gameDate <= tomorrow.endOf('day')
    })
}

const stripOutScore = (games) => {
    return games.map((game) => {
        const {id, status, scheduled, reference} = game;
        return {
            id: id,
            status: status,
            scheduled: moment(scheduled).format('MMMM Do YYYY, h:mm a z'),
            reference: reference,
            home: game.home,
            away: game.away
        }
    })
}

router.get('/:range/:pointSpread', (req, res) => {
    request(`https://api.sportradar.us/wnba/trial/v4/en/games/2018/REG/schedule.json?api_key=${process.env.API_KEY}`, (error, response, body) => {
        if (error) {
            console.log('error:', error);
        }

        const range = parseInt(req.params.range);
        const pointSpread = parseInt(req.params.pointSpread);

        const games = JSON.parse(body).games;
        const goodGames = getGoodGames(games, range, pointSpread);
        res.send(stripOutScore(goodGames));
    });
})

router.get('/today', (req, res) => {
    request(`https://api.sportradar.us/wnba/trial/v4/en/games/2018/REG/schedule.json?api_key=${process.env.API_KEY}`, (error, response, body) => {
        if (error) {
            console.log('error:', error);
        }

        const games = JSON.parse(body).games;
        const gamesToday = getGamesToday(games);
        res.send(stripOutScore(gamesToday));
    });
})

router.get('/tomorrow/:country/:city', (req, res) => {
    request(`https://api.sportradar.us/wnba/trial/v4/en/games/2018/REG/schedule.json?api_key=${process.env.API_KEY}`, (error, response, body) => {
        if (error) {
            console.log('error:', error);
        }

        const games = JSON.parse(body).games;
        const gamesTomorrow = getGamesTomorrow(games);
        res.send(stripOutScore(gamesTomorrow));
    });
})

module.exports = router;