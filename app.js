require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const MOVIES = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

function validateUser(req, res, next){
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('authorization');
    console.log(authToken);
    
    if(authToken !== apiToken){
        return res
            .status(401)
            .send(`Unauthorized Access`);
    }

    next();
}

app.use(validateUser);

app.get(`/movies`, (req,res) => {
    let result = MOVIES;
    const {genre = '', country = '', avg_vote = ''} = req.query;

    // Filtering result array if Genre is provided
    result = result.filter((movie) => movie.genre.toLowerCase().includes(genre.toLowerCase()));

    // Filtering result with country parameter
    result = result.filter((movie) => movie.country.toLowerCase().includes(country.toLowerCase()));

    // Coverting avg_vote from String to a Float number
    const avgVoteFloat = parseFloat(avg_vote, 10);

    // Filtering using average vote, give back all movies with greater vote than what is supplied by the user
    result = result.filter((movie) => movie.avg_vote >= avgVoteFloat);
    
    res.send(result);
});

module.exports = app;