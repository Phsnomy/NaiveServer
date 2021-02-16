import express = require("express")

// Logger, should connect to database later.
const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} ${req.ip}`)
    next()
}

export = logger