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
                    <li id=${movie.Series_Title}>
                        <img src=${movie.Poster_Link}>
                        <a href='/movies/${movie.Series_Title}' class='movie-title'>${movie.Series_Title}</a>
                    </li>
                `)
            }).join('')}
            </ul>
        </body>
    </html>
    `
    res.send(html)
            

})

app.get('/movies/:title', (req, res, next)=>{
    const title = req.params.title
    const movie = movieList.find(movieItem => movieItem.Series_Title === title)
    const html=`
    <html>
        <head>
            <link rel="stylesheet" href="/style.css" />
            <nav>
                <a href='/'>Home</a>
                <a href='/all'>All Movies</a>
                <a href='/genres'>Genres</a>
            </nav>
            <h1>
                ${title}
            </h1>
        </head>
        <body>
            <img class="detail-photo" src=${movie.Poster_Link}/>
            <div>
                IMDB Rating: ${movie.IMDB_Rating}
            </div>
            <div>
                Runtime: ${movie.Runtime}
            </div>
            <div>
                Genre: ${movie.Genre.split(', ').map(genre =>{
                    return(`<a href=/${genre}> ${genre}</a>`)
                })} 
                
                
            </div>
            <div>
                Director: ${movie.Director}
            </div>
            <div>
                Cast: ${movie.Star1},${movie.Star2},${movie.Star3}, ${movie.Star4} 
            </div>
            <div class='detail-overview'>
                Overview: ${movie.Overview}
            </div>
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

app.get('/:genre', (req, res, next) =>{
    const genre = req.params.genre
    const genreList = movieList.filter(movie => {
        if(movie.Genre.includes(genre)){
            return movie;
        }
    })
    const html = `
        <html>
            <head>
                ${genre}
            </head>
            <body>
                <ul>
                ${genreList.map(movie =>{
                    return(`
                        <li>
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