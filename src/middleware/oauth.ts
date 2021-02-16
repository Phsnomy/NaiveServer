import express = require("express")
import axios, { AxiosRequestConfig } from "axios"
import config from "../snippets/config"

let user = {
    username: 'none',
    avatar: 'none',
    id: 0,
    email: 'none',
    href: 'none'
}

function oauth(req: express.Request, res: express.Response) {
    let code = req.query.code
    let resconf: AxiosRequestConfig = {
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
            `client_id=${config.clientid}&` +
            `client_secret=${config.clientsecret}&` +
            `code=${code}`,
        headers: { accept: 'application/json' }
    }
    axios(resconf).then(async (oresfirst) => {
        // oresfirst: oAuth first response
        resconf.method = 'get'
        resconf.url = 'https://api.github.com/user'
        resconf.headers = {
            accept: 'application/json',
            Authorization: `token ${oresfirst.data.access_token}`
        }
        // oresecond: oAuth second response
        await axios(resconf).then((oresecond) => {
            user.username = oresecond.data.login
            user.id = oresecond.data.id
            user.avatar = oresecond.data.avatar
            user.href = oresecond.data.html_url
        })
        resconf.url = 'https://api.github.com/user/emails'
        await axios(resconf).then((oresecond) => {
            user.email = oresecond.data[0].email
        })
        // user is now aviliable
        res.json(user)
        // write to database
    }).catch((reason) => {
        // Should have error message
        res.send("LoginError")
    })
}

export = oauth