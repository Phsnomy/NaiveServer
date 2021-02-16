import express = require("express")
import logger = require("./middleware/logger")
import oauth = require("./middleware/oauth")

let app = express()

import config from "./snippets/config"

// Middleware: logger
app.use(logger)

// Middleware: route static files
app.use(express.static("public"))

// Middleware: body parsers
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Route: oauth
app.get('/oauth/redirect', oauth)

// Server
app.listen(config.PORT, () => {
    console.log(`Server start on ${config.PORT}`)
})