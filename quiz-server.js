var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , buzzers = require('./buzzers');

app.listen(90);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

/*io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/

var buzzer1 = new buzzers.BuzzerController();
var buzzer2 = new buzzers.BuzzerController(null, null, 4096);
//var buzzer2 = null;

function blinkLed(buzzerNumber)
{
    var buzzer = null;
    if (buzzerNumber < 4) {
        buzzer = buzzer1;
    } else {
        buzzer = buzzer2;
        buzzerNumber -= 4;
    }
    buzzer.led(buzzerNumber, true);
    setTimeout(function () {
        buzzer.led(buzzerNumber, false);
    }, 500);
}

buzzer1.on('button', function (buzzer, button, state) {
    io.sockets.emit('click', {
        'buzzer' : buzzer,
        'button' : button,
        'state' : state
    });
    if (state) {
        blinkLed(buzzer);
    }
});

buzzer2.on('button', function (buzzer, button, state) {
    io.sockets.emit('click', {
        'buzzer' : buzzer + 4,
        'button' : button,
        'state' : state
    });
    if (state) {
        blinkLed(buzzer + 4);
    }
});
