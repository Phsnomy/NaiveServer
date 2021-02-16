import express = require("express")
import axios from "axios"
import config from "../snippets/config"
import { type } from "os"

let user: {
    username: string,
    avatar: string
}

let oauth = (req: express.Request, res: express.Response) => {
    let code = req.query.code
    axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
            `client_id=${config.clientid}&` +
            `client_secret=${config.clientsecret}&` +
            `code=${code}`,
        headers: { accept: 'application/json' }
    }).then((oresfirst) => {
        // oresfirst: oAuth first response
        axios({
            method: 'get',
            url: 'https://api.github.com/user',
            headers: { accept: 'application/json',
            Authorization: `token ${oresfirst.data.access_token}`}}).then((oresecond)=>{
                // oresecond: oAuth second response
                console.log(oresecond.data)
            }).catch((reason)=>{console.log(reason)})
    }).catch((reason) => {console.log(reason)})
    res.send("OK")
}

export = oauth