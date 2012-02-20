var socket = io.connect('http://localhost');

$(function() {
    $('form#login').bind('submit', function() {
        var name = $('input#nickname').val();
        socket.emit('set nickname', name);
    });

    $('form#chat').bind('submit', function() {
        var msg = $('input#message').val();
        socket.emit('message', msg, function(status) {
            $('.chat input#message').val('').focus();
        });
    });
});

socket.on('logged in', function(name) {
    $('form#login').hide();
    $('.chat').show();
    $('.chat input#message').focus();
});

socket.on('joined', function(name) {
    $('.chat #transcript table').append(
        "<tr class='notice'><th></th><td>"   +
        name + " just joined the conversation." +
        "</td></tr>"
    );
});

socket.on('left', function(name) {
    $('.chat #transcript table').append(
        "<tr class='notice'><th></th><td>"    +
        name + " just left the conversation." +
        "</td></tr>"
    );
});

socket.on('message', function(data) {
    $('.chat #transcript table').append(
        "<tr class='message'>"              +
        "  <th>" + data.username + ":</th>" +
        "  <td>" + data.message + "</td>"   +
        "</tr>"
    );
});
