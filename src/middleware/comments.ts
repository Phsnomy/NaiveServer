import express from "express"
import fs = require("fs")
import gen_fpath from "../snippets/gen_fpath"

/*
Comment Protype:
{
    "userid": uuid
    "text": comment
}
*/


let getcomment = (req: express.Request, res: express.Response) => {
    let originurl = gen_fpath('comments',req.params.originurl.toString(),'json')
    fs.readFile(originurl, (err, data) => {
        if (err) {
            res.status(400)
        } else {
            res.json(JSON.parse(data.toString()))
        }
    })
}

let postcomment = (req: express.Request, res: express.Response) => {
    let originurl = gen_fpath('comments',req.params.originurl.toString(),'json')
}