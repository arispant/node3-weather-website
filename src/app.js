const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

// routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aris Pantelakis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Aris Pantelakis'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'What can i do for you? Please feel free to contact me with the form below!',
        title: 'Help',
        name: 'Aris Pantelakis'
    })
})

app.post('/help', (req, res) => {
    res.send('Sorry! This service is not currently available!')
})

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })
          })
    })  
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Aris Pant',
        errorMessage: 'Help article not found!',
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Aris Pant',
        errorMessage: 'Page not found!',
    })
})

app.listen(port, () => {
     console.log('Server is up on port '+ port)
})
    