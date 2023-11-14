const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const peerConnection = new RTCPeerConnection();
    const constraints = {
      video: true,
      audio: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        localVideo.srcObject = stream;
        peerConnection.addStream(stream);

        peerConnection.createOffer()
          .then(offer => {
            peerConnection.setLocalDescription(offer);
            sendOffer(offer);
          });
      });

    peerConnection.onoffer = event => {
      peerConnection.setRemoteDescription(event.offer);
      peerConnection.createAnswer()
        .then(answer => {
          peerConnection.setLocalDescription(answer);
          sendAnswer(answer);
        });
    };

    peerConnection.onanswer = event => {
      peerConnection.setRemoteDescription(event.answer);
    };

    peerConnection.onicecandidate = event => {
      sendIceCandidate(event.candidate);
    };

    peerConnection.oniceconnectionstatechange = event => {
      if (event.iceConnectionState === 'connected') {
        console.log('Connected to remote peer');
      } else if (event.iceConnectionState === 'disconnected') {
        console.log('Disconnected from remote peer');
      }
    };

    function sendOffer(offer) {
      // Signal the offer to the remote peer through a signaling channel
      // (e.g., WebSocket, Socket.IO)
      console.log('Sending offer: ', offer);
    }

    function sendAnswer(answer) {
      // Signal the answer to the remote peer through a signaling channel
      // (e.g., WebSocket, Socket.IO)
      console.log('Sending answer: ', answer);
    }

    function sendIceCandidate(candidate) {
      // Signal the ice candidate to the remote peer through a signaling channel
      // (e.g., WebSocket, Socket.IO)
      console.log('Sending ice candidate: ', candidate);
    }