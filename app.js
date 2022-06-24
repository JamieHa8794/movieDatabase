const express = require('express');
const app = express();

const data = require('./data');
const movieList = data.list();

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})



app.get('/', (req, res, next)=>{
    const html = `
    <html>
        <head>
        <h1>
            Movies
        </h1>
        </head>
        <body>
            <ul>
            ${movieList.map(movie =>{
                return(`
                    <li>
                        <img src=${movie.Poster_Link}>
                        ${movie.Series_Title}

                    </li>
                `)
            }).join('')}
            </ul>
        </body>
    </html>
    `
    res.send(html)
})