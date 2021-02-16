function gen_fpath(dir:string, originurl: string, ext:string){
    return dir+originurl.slice(0,-1)+'.'+ext
}

export = gen_fpath