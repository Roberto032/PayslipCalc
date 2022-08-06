const http = require ('http')
const port = 4000
const fs = require ('fs')


const server = http.createServer(function(req,res){ //creates http server so that we can broadcast to localhost
    res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile('index.html',function(error,data){
        if (error){
            res.writeHead(404)
            res.write('Error Not Found')
        }else{

            res.write(data)
            

        }
        res.end() //ends respose

    })
    
})

server.listen(port, function(error){

    if (error){
        console.log('error',error) // if an error appears will print
    }else{
        console.log("server is listening on " + port) //if server starts will print
    }


})