const routes = require('../models/routeModel')

exports.getAllFlights = (origin, destiny) => {
    const setFlights = []
    const departuresFromOrigin = routes.filter(route => route.origin === origin)
    const arrivalsOnDetiny = routes.filter(route => route.destiny === destiny)
    departuresFromOrigin.map(departure => {
        if (departure.destiny === destiny)
            setFlights.push({
                route: `${departure.origin} > ${departure.destiny}`,
                price: departure.price
            })
        arrivalsOnDetiny.map(arrival => {        
            if (departure.destiny === arrival.origin)
                setFlights.push({
                    route: `${departure.origin} > ${arrival.origin} > ${arrival.destiny}`,
                    price: departure.price + arrival.price
                })
        })
    })

    return setFlights
}

exports.getCheapestFlight = (req, res, next) => {
    const args  = req.swagger.params
    console.log(args.origin.value)

    let origin  = args.origin.value
    let destiny = args.destiny.value 
    const avaliableFlights = this.getAllFlights(origin, destiny)

    const Prices = []
    avaliableFlights.map(flight => Prices.push(flight.price)) //Put only the prices into a new array
    bestPrice = Math.min(...Prices) //Gets the best price available

    flights = avaliableFlights.filter(flight => flight.price === bestPrice) // Returns the cheapest flight

    console.log(avaliableFlights)

    resp = {
        data: flights,
        message: "",
        success: true
    }

    let response = JSON.stringify(resp)
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(response)
}