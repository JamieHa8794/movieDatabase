const express = require('express');
const app = express();

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
        </body>
    </html>
    `
    res.send(html)
})