import fs = require("fs")

let config: { 
    "PORT": number,
    "clientid": string,
    "clientsecret": string,
} = JSON.parse(fs.readFileSync("config.json").toString())

console.log(config)

export = config