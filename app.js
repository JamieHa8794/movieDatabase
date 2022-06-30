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
                <nav>
                <a href='/'>Home</a>
                <a href='/all'>All Movies</a>
                <a href='/genres'>Genres</a>
                </nav>
                <h1>
                    Movie Database
                </h1>
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
        <nav>
        <a href='/'>Home</a>
        <a href='/all'>All Movies</a>
        <a href='/genres'>Genres</a>
        </nav>
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
                        <div class='movie-title'>${movie.Series_Title}</div>
                    </li>
                `)
            }).join('')}
            </ul>
        <script>
            
        </script>
        </body>
    </html>
    `
    res.send(html)
    
})


app.get('/genres', (req, res, next)=>{
    const genres = []
    movieList.forEach(movie =>{
        const movieGenre = movie.Genre.split(',')
        movieGenre.forEach(genre =>{
            if(!genres.includes(genre.trim())){
                genres.push(genre.trim())
            }
        })
    })

    const html = `
    <html>
    <head>
        <link rel='stylesheet' href='/style.css'/>
        <nav>
        <a href='/'>Home</a>
        <a href='/all'>All Movies</a>
        <a href='/genres'>Genres</a>
        </nav>
        <h1>
            List by Genres
        </h1>
    </head>
    <body>
        <ul>
            ${genres.map(genre =>{
                return(`
                    <li>
                        <a href=${genre}> ${genre} </a>
                    </li>
                `)
            }).join('')}
        </ul>
    </body>
    </html>
    `
    res.send(html)
})