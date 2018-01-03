var numberText = document.getElementById("number"),
    textText = document.getElementById("message"),
    button = document.getElementById("button"),
    response = document.getElementById("response");

button.addEventListener('click' , send, false);

const socket = io();
socket.on('sendStatus', function(data){
    response.innerHTML = '<h6> Text has been sent to ' + data + '</h6>';
});

function send(){
    var number = numberText.value.replace(/\D/g, '');
    var text = textText.value;

    fetch('/', {
        method : 'post',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify({number : number , text: text})
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    })
}
      