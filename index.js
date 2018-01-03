const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('Nexmo');
const socketio = require('socket.io');

const app = express();

const nexmo = new Nexmo({
    apiKey: '6f2d6561',
    apiSecret : '541891687dcd8ce3'
}, {debug : true});

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req,res)=>{
    const number = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(
        'NEXMO', number, text , { type : 'unicode'},
        (err, responseData) =>{
            if(err){
                console.log(err)
            }
            else{
                const data = responseData.messages[0]['to'];
                io.emit("sendStatus", data);
            }
        }
    )
});

const port = 3000;

const server = app.listen(port, () => console.log(`Server started at port ${port}`));

const io = socketio(server);
io.on('connection', ()=>{
    console.log('Conected');
    io.on('disconnect', ()=>{
        console.log('Disconnected');
    })
})