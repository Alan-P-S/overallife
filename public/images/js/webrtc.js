const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');

let localStream;
let pc;
const ws = new WebSocket('ws://localhost:3000');

const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302'
        }
    ]
};

startButton.onclick = start;
callButton.onclick = call;
hangupButton.onclick = hangup;

function start() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            localVideo.srcObject = stream;
            localStream = stream;
        })
        .catch(error => console.error('Error accessing media devices.', error));
}

function call() {
    pc = new RTCPeerConnection(configuration);
    pc.onicecandidate = event => {
        if (event.candidate) {
            ws.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
        }
    };
    pc.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

    pc.createOffer()
        .then(offer => {
            pc.setLocalDescription(offer);
            ws.send(JSON.stringify({ type: 'offer', offer: offer }));
        })
        .catch(error => console.error('Error creating offer.', error));
}

function hangup() {
    pc.close();
    pc = null;
}

ws.onmessage = message => {
    const data = JSON.parse(message.data);
    if (data.type === 'offer') {
        pc = new RTCPeerConnection(configuration);
        pc.onicecandidate = event => {
            if (event.candidate) {
                ws.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
            }
        };
        pc.ontrack = event => {
            remoteVideo.srcObject = event.streams[0];
        };
        pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
        pc.createAnswer()
            .then(answer => {
                pc.setLocalDescription(answer);
                ws.send(JSON.stringify({ type: 'answer', answer: answer }));
            })
            .catch(error => console.error('Error creating answer.', error));
    } else if (data.type === 'answer') {
        pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    } else if (data.type === 'candidate') {
        pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
};