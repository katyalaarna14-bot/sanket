// ===============================
// SANKET - BASIC INTERACTIONS
// ===============================

// Start communication
function startCommunication() {
    alert("Welcome to Sanket! 🤟\n\nCommunication mode will open here.");
}


// Explore Sanket
function learnMore() {
    document.getElementById("features").scrollIntoView({
        behavior: "smooth"
    });
}


// Text to Speech
function speakText(text) {

    if ("speechSynthesis" in window) {

        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = "en-IN";
        speech.rate = 0.9;

        window.speechSynthesis.speak(speech);

    } else {

        alert("Text-to-speech is not supported in this browser.");

    }
}


// Voice recognition
function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice recognition is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.start();

    const voiceText =
        document.getElementById("voiceText");

    if (voiceText) {
        voiceText.innerText = "Listening... 🎙️";
    }

   recognition.onresult = function(event) {

    const text =
        event.results[0][0].transcript;

    if (voiceText) {
        voiceText.innerText = text;
    }

    const signInput =
        document.getElementById("signInput");

    if (signInput) {
        signInput.value = text;
        convertToSign();
    }
};

    recognition.onerror = function() {

        if (voiceText) {
            voiceText.innerText =
                "Could not hear you. Try again.";
        }
    };
}
// Feature buttons
function openFeature(feature) {

    if (feature === "sign") {

        alert(
            "🤟 Sign Recognition\n\n" +
            "Camera-based sign recognition is available."
        );

    }

    else if (feature === "learn") {

        alert(
            "📚 Learn Signs\n\n" +
            "HELLO 👋 — Open Palm\n" +
            "HELP ✊ — Closed Fist\n" +
            "YES 👍 — Thumbs Up"
        );

    }

    else if (feature === "emergency") {

        alert(
            "🚨 EMERGENCY MODE\n\n" +
            "✊ HELP\n" +
            "🏥 HOSPITAL\n" +
            "👮 POLICE\n" +
            "🔥 FIRE\n" +
            "⚠️ DANGER\n\n" +
            "Use these signs to communicate urgent needs."
        );

    }

}


// Hindi / English switch
let hindiMode = false;

function changeLanguage() {

    const heroText = document.getElementById("heroText");

    if (!hindiMode) {

        heroText.innerText =
            "Sign language, voice aur technology ke through communication barriers ko kam karna.";

        hindiMode = true;

    } else {

        heroText.innerText =
            "Breaking communication barriers with sign language, voice and technology.";

        hindiMode = false;

    }

}


// ===============================
// CAMERA + HAND DETECTION
// ===============================

let handCamera = null;


// ===============================
// VOICE OUTPUT
// ===============================

let lastSpokenGesture = "";
let gestureCandidate = "";
let gestureCount = 0;


function speakGesture(gesture) {

    let text = "";

    if (gesture === "HELLO ✋") {
        text = "Hello";
    }

    else if (gesture === "HELP ✊") {
        text = "Help";
    }

    else if (gesture === "YES 👍") {
        text = "Yes";
    }

    else {
        return;
    }

    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.lang = "en-IN";
        speech.rate = 0.9;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);

    }
}


// ===============================
// GESTURE RECOGNITION
// ===============================
function recognizeGesture(landmarks) {

    // Distance between two points
    function distance(a, b) {
        return Math.sqrt(
            Math.pow(a.x - b.x, 2) +
            Math.pow(a.y - b.y, 2)
        );
    }

    // Finger states
    const indexOpen =
        distance(landmarks[8], landmarks[5]) >
        distance(landmarks[6], landmarks[5]) * 1.2;

    const middleOpen =
        distance(landmarks[12], landmarks[9]) >
        distance(landmarks[10], landmarks[9]) * 1.2;

    const ringOpen =
        distance(landmarks[16], landmarks[13]) >
        distance(landmarks[14], landmarks[13]) * 1.2;

    const pinkyOpen =
        distance(landmarks[20], landmarks[17]) >
        distance(landmarks[18], landmarks[17]) * 1.2;

    // ✋ HELLO
    if (
        indexOpen &&
        middleOpen &&
        ringOpen &&
        pinkyOpen
    ) {
        return "HELLO ✋";
    }

    // ✊ / 👍
    const fingersClosed =
        !indexOpen &&
        !middleOpen &&
        !ringOpen &&
        !pinkyOpen;

    if (fingersClosed) {

        // Thumb extended upward
        const thumbUp =
            landmarks[4].y < landmarks[3].y &&
            landmarks[3].y < landmarks[2].y;

        if (thumbUp) {
            return "YES 👍";
        }

        return "HELP ✊";
    }

    return "UNKNOWN";
}

let stableGesture = "";
let pendingGesture = "";
let pendingCount = 0;

function updateStableGesture(gesture) {

    if (gesture === "UNKNOWN") {
        pendingGesture = "";
        pendingCount = 0;
        return;
    }

    if (gesture === pendingGesture) {
        pendingCount++;
    } else {
        pendingGesture = gesture;
        pendingCount = 1;
    }

    // Require the same gesture for several frames
    if (pendingCount >= 12) {

        if (stableGesture !== gesture) {

            stableGesture = gesture;

            document
                .getElementById("gestureResult")
                .innerText =
                "Gesture: " + stableGesture;

            speakGesture(stableGesture);
            const detectedText =
    document.getElementById("detectedText");

if (detectedText) {

    if (stableGesture === "HELLO ✋") {
        detectedText.innerText = "Hello 👋";
    }

    else if (stableGesture === "HELP ✊") {
        detectedText.innerText = "Help 🆘";
    }

    else if (stableGesture === "YES 👍") {
        detectedText.innerText = "Yes 👍";
    }

}
        }
    }
}
// ===============================
// START CAMERA
// ===============================

async function startCamera() {

    const video =
        document.getElementById("camera");

    const message =
        document.getElementById("cameraMessage");

    const canvas =
        document.getElementById("handCanvas");

    const ctx =
        canvas.getContext("2d");


    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({

                video: true,
                audio: false

            });


        video.srcObject = stream;

        video.style.display = "block";

        message.style.display = "none";


        // MediaPipe Hands
        const hands = new Hands({

            locateFile: (file) => {

                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;

            }

        });


        hands.setOptions({

            maxNumHands: 1,

            modelComplexity: 1,

            minDetectionConfidence: 0.6,

            minTrackingConfidence: 0.6

        });


        // Process detected hands
        hands.onResults((results) => {

            canvas.width =
                video.videoWidth;

            canvas.height =
                video.videoHeight;


            ctx.clearRect(

                0,
                0,
                canvas.width,
                canvas.height

            );


            if (results.multiHandLandmarks) {

                for (
                    const landmarks
                    of results.multiHandLandmarks
                ) {


                    // Draw hand connections
                    drawConnectors(

                        ctx,

                        landmarks,

                        HAND_CONNECTIONS,

                        {

                            color: "#62dfc1",

                            lineWidth: 4

                        }

                    );


                    // Draw hand points
                    drawLandmarks(

                        ctx,

                        landmarks,

                        {

                            color: "#ffffff",

                            lineWidth: 2,

                            radius: 5

                        }

                    );


                    const gesture = recognizeGesture(landmarks);

document
    .getElementById("gestureResult")
    .innerText =
    "Gesture: " + gesture;

updateStableGesture(gesture);

                }

            }

        });


        // MediaPipe camera
        handCamera =
            new Camera(video, {

                onFrame: async () => {

                    await hands.send({

                        image: video

                    });

                },

                width: 640,

                height: 480

            });


        handCamera.start();


    } catch (error) {

        console.error(error);


        alert(

            "Camera access failed.\n\n" +

            "Please allow camera permission and try again."

        );

    }

}

// ===============================
// REVERSE COMMUNICATION
// ===============================
function convertToSign() {

    const input =
        document.getElementById("signInput").value.trim().toLowerCase();

    const output =
        document.getElementById("signOutput");

    if (input === "") {
        output.innerHTML = "Please type something first.";
        return;
    }

    if (input.includes("hello")) {

        output.innerHTML = `
            <div class="sign-display">
                <div class="sign-emoji">👋</div>
                <h2>HELLO</h2>
                <p>Open palm</p>
            </div>
        `;

    }

    else if (input.includes("help")) {

        output.innerHTML = `
            <div class="sign-display">
                <div class="sign-emoji">✊</div>
                <h2>HELP</h2>
                <p>Closed fist</p>
            </div>
        `;

    }

    else if (input.includes("yes")) {

        output.innerHTML = `
            <div class="sign-display">
                <div class="sign-emoji">👍</div>
                <h2>YES</h2>
                <p>Thumbs up</p>
            </div>
        `;

    }

    else {

        output.innerHTML = `
            <div class="sign-display">
                <div class="sign-emoji">🤟</div>
                <h2>Sign Guide</h2>
                <p>Visual guide coming soon for: ${input}</p>
            </div>
        `;

    }
}
function speakDetectedText() {

    const detectedText =
        document.getElementById("detectedText");

    if (!detectedText) return;

    const text = detectedText.innerText;

    if (text === "Waiting..." || text === "") {
        return;
    }

    speakText(text);
}