// author: jthurau

$(function() {

    // test size 
    $('h4').text('width: ' + $(window).width() + ' height: ' + $(window).height());

    // selects all icons for tap event
    $(".ui-grid-b div > i").bind("tap", tapHandler);
 
    function tapHandler() {
        var cmd    = $(this).data('cmd'),
            cmdObj = {};

        // extra params need to be set if Play/Pause, Forward or Rewind are tapped
        switch (cmd) {
            case 'Player.PlayPause':
                cmdObj.params = {'playerid': 1};
                break;
            case 'Player.Forward':
                cmd = 'Player.SetSpeed';
                cmdObj.params = {'playerid': 1, 'speed': 'increment'};
                break;
            case 'Player.Rewind':
                cmd = 'Player.SetSpeed';
                cmdObj.params = {'playerid': 1, 'speed': 'decrement'};
                break;
        }

        // finish preparing command object and send
        cmdObj.cmd = cmd;
        sendCommand(cmdObj);
    }

    function sendCommand(cmdObj) {

        // request data. 'params' key will sometimes be undefined, stringify will remove it from the object
        var data = {
            id      : 1,
            jsonrpc : '2.0',
            method  : cmdObj.cmd,
            params  : cmdObj.params 
        };

        // send ajax request to rpi
        // data needs to be sent as string to get parsed by the remote API
        $.ajax({
            url         : "jsonrpc" + "?" + cmdObj.cmd,
            data        : JSON.stringify(data),
            type        : 'POST',
            dataType    : 'json',
            contentType : 'application/json'
        });
    }

});