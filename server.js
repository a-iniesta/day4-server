const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs")
const PORT = 3000
let beers;

app.use(cors())

fs.readFile("beers.json", "utf8", function(err, beersPayload) {
    beers = JSON.parse(beersPayload)
})

app.get("/beers", (req, res) => {
    const chosenBeers = 
        beers
            .map(beer => ({
                id: beer.id,
                name: beer.name,
                description: beer.description,
                image_url: beer.image_url
            }))
    
    res.json(chosenBeers)
})

app.get("/beer/:id", (req, res) => {
    const chosenBeer = 
        beers
            .filter(beers => beers.id === +req.params.id)
            .map(beer => ({
                id: beer.id,
                name: beer.name,
                description: beer.description,
                image_url: beer.image_url
            }))[0]
    
    res.json(chosenBeer)
})

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`)
})