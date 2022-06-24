const express = require('express');
const app = express();

const data = require('./data');
const movieList = data.list();

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})

const path = require('path')
const staticMiddleware = express.static(path.join(__dirname, 'public'))
app.use(staticMiddleware)

app.get('/', (req, res, next)=>{
    const html = `
        <html>
            <head>
                <link rel="stylesheet" href="/style.css" />
                <h1>
                    Movie Database
                </h1>
                <nav>
                <a href='/all'>All Movies</a>
                <a href='/categories'>Categories</a>
                </nav>
            </head>
            <body>
            </body>
        </html>
    `
    res.send(html)
})

app.get('/all', (req, res, next)=>{
    const html = `
    <html>
        <head>
        <link rel="stylesheet" href="/style.css" />
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
                        <div className='movie-title'>${movie.Series_Title}</div>

                    </li>
                `)
            }).join('')}
            </ul>
        </body>
    </html>
    `
    res.send(html)

})