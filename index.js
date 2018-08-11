
const express = require('express')


const PORT = process.env.PORT || 3000;
const app = express()

const http = require('http').Server(app)

const io = require('socket.io')(http)

let SocketUsers = new Array()

app.use(express.static(__dirname +'/views'))
// All HTML and VIEWS files are ni the folder View
app.use(express.static(__dirname +'/script'))
// In the folder Script we save all about JS and CSS

app.get('/',(req,res)=>
{
	res.sendFile('index.html');
});

io.on('connection', function(socket)
{
	console.log('New Connection ');
	SocketUsers.push(socket)
	console.log(SocketUsers.length+" are Connected");

	socket.on('chat-message', function(msg)
	{
		io.volatile.emit('chat-message', msg);
		console.log("Mensaje emitido!");
	});

	socket.on("disconnect", function(socket)
	{
		console.log("Bye bye!");
	});	

});


http.listen(PORT,(req,res)=>
{
	console.log(`NODE JS SERVER LISTENING ON PORT: ${PORT}`)
})