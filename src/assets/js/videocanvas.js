function streamCam(){
  var client = 'ws://172.20.4.195:9999';
  var canvas = document.getElementById('video-canvas');
  var player = new JSMpeg.Player(client, {
    canvas: canvas,
    audio : false,
  });  
}

/*
function streamCam1(){
  var client1 = new WebSocket('ws://172.20.4.195:9997');
  var canvas1 = document.getElementById('video-canvas1');
  var player = new jsmpeg(client1, {
    canvas: canvas1
  });  
}

function streamCam2(){
  var client2 = new WebSocket('ws://172.20.4.195:9998');
  var canvas2 = document.getElementById('video-canvas2');
  var player = new jsmpeg(client2, {
    canvas: canvas2
  });  
}
*/
