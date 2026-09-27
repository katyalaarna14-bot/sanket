// ===============================
// SANKET - BASIC INTERACTIONS
// ===============================

// ===============================
// START COMMUNICATION
// ===============================

function startCommunication() {

    const communicationCard =
        document.querySelector(".communication-card");

    if (communicationCard) {

        communicationCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// ===============================
// EXPLORE SANKET
// ===============================

function learnMore() {

    const features =
        document.getElementById("features");

    if (features) {

        features.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ===============================
// TEXT TO SPEECH
// ===============================

function speakText(text) {

    if (!("speechSynthesis" in window)) {

        alert(
            hindiMode
                ? "इस ब्राउज़र में Text-to-Speech उपलब्ध नहीं है।"
                : "Text-to-speech is not supported in this browser."
        );

        return;
    }

    let speechText = text;

    if (hindiMode) {

        const translations = {

            "Welcome to Sanket":
                "सैंकेट में आपका स्वागत है",

            "Help":
                "मदद",

            "I need a hospital":
                "मुझे अस्पताल चाहिए",

            "Police":
                "पुलिस",

            "Fire":
                "आग",

            "Danger":
                "खतरा",

            "Hello":
                "नमस्ते",

            "Yes":
                "हाँ"

        };

        if (translations[text]) {
            speechText = translations[text];
        }

    }

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(speechText);

    speech.lang =
        hindiMode ? "hi-IN" : "en-IN";

    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

}


// ===============================
// VOICE RECOGNITION
// ===============================

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            hindiMode
                ? "इस ब्राउज़र में Voice Recognition उपलब्ध नहीं है।"
                : "Voice recognition is not supported in this browser."
        );

        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.lang =
        hindiMode ? "hi-IN" : "en-IN";

    recognition.interimResults = false;

    const voiceText =
        document.getElementById("voiceText");

    if (voiceText) {

        voiceText.innerText =
            hindiMode
                ? "सुन रहा हूँ... 🎙️"
                : "Listening... 🎙️";

    }

    recognition.start();

    recognition.onresult =
        function(event) {

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


    recognition.onerror =
        function() {

            if (voiceText) {

                voiceText.innerText =
                    hindiMode
                        ? "आपकी आवाज़ सुनाई नहीं दी। फिर से कोशिश करें।"
                        : "Could not hear you. Try again.";

            }

        };

}


// ===============================
// FEATURE BUTTONS
// ===============================

function openFeature(feature) {

    if (feature === "sign") {

        alert(

            hindiMode

                ?

                "🤟 साइन रिकग्निशन\n\n" +
                "कैमरा आधारित साइन रिकग्निशन उपलब्ध है।"

                :

                "🤟 Sign Recognition\n\n" +
                "Camera-based sign recognition is available."

        );

    }


    else if (feature === "learn") {

        alert(

            hindiMode

                ?

                "📚 साइन सीखें\n\n" +
                "नमस्ते 👋 — खुली हथेली\n" +
                "मदद ✊ — बंद मुट्ठी\n" +
                "हाँ 👍 — अंगूठा ऊपर"

                :

                "📚 Learn Signs\n\n" +
                "HELLO 👋 — Open Palm\n" +
                "HELP ✊ — Closed Fist\n" +
                "YES 👍 — Thumbs Up"

        );

    }


    else if (feature === "emergency") {

        alert(

            hindiMode

                ?

                "🚨 आपातकालीन मोड\n\n" +
                "✊ मदद\n" +
                "🏥 अस्पताल\n" +
                "👮 पुलिस\n" +
                "🔥 आग\n" +
                "⚠️ खतरा\n\n" +
                "इन विकल्पों का उपयोग जरूरी जरूरतों को बताने के लिए करें।"

                :

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


// ===============================
// HINDI / ENGLISH
// ===============================

let hindiMode = false;


function setText(selector, text, index = 0) {

    const elements =
        document.querySelectorAll(selector);

    if (elements[index]) {
        elements[index].innerText = text;
    }

}


function changeLanguage() {

    hindiMode = !hindiMode;


    // ===============================
    // NAVIGATION
    // ===============================

    const navLinks =
        document.querySelectorAll(".nav-links a");

    if (navLinks.length >= 4) {

        if (hindiMode) {

            navLinks[0].innerText = "होम";
            navLinks[1].innerText = "फीचर्स";
            navLinks[2].innerText = "कैसे काम करता है";
            navLinks[3].innerText = "हमारे बारे में";

        } else {

            navLinks[0].innerText = "Home";
            navLinks[1].innerText = "Features";
            navLinks[2].innerText = "How It Works";
            navLinks[3].innerText = "About";

        }

    }


    // ===============================
    // HERO
    // ===============================

    setText(
        ".badge",
        hindiMode
            ? "🤟 सुलभ संचार"
            : "🤟 Accessible Communication"
    );


    const heroText =
        document.getElementById("heroText");

    if (heroText) {

        heroText.innerText =
            hindiMode

                ?

                "साइन लैंग्वेज, आवाज़ और तकनीक के साथ संचार की बाधाओं को कम करना।"

                :

                "Breaking communication barriers with sign language, voice and technology.";

    }


    const heroButtons =
        document.querySelectorAll(".hero-buttons button");

    if (heroButtons.length >= 2) {

        heroButtons[0].innerText =
            hindiMode
                ? "संचार शुरू करें →"
                : "Start Communication →";

        heroButtons[1].innerText =
            hindiMode
                ? "सैंकेट देखें"
                : "Explore Sanket";

    }


    // ===============================
    // HERO STATS
    // ===============================

    const stats =
        document.querySelectorAll(".stats p");

    if (stats.length >= 3) {

        stats[0].innerText =
            hindiMode
                ? "साइन रिकग्निशन"
                : "Sign Recognition";

        stats[1].innerText =
            hindiMode
                ? "वॉइस सपोर्ट"
                : "Voice Support";

        stats[2].innerText =
            hindiMode
                ? "बहुभाषी"
                : "Multilingual";

    }


    // ===============================
    // COMMUNICATION HUB
    // ===============================

    const live =
        document.querySelector(".card-header small");

    if (live) {

        live.innerText =
            hindiMode
                ? "सैंकेट लाइव"
                : "SANKET LIVE";

    }


    const hub =
        document.querySelector(".card-header h3");

    if (hub) {

        hub.innerText =
            hindiMode
                ? "संचार केंद्र"
                : "Communication Hub";

    }


    const status =
        document.querySelector(".status");

    if (status) {

        status.innerHTML =
            hindiMode
                ? "<span></span> तैयार"
                : "<span></span> Ready";

    }


    const cameraMessage =
        document.getElementById("cameraMessage");

    if (cameraMessage) {

        const cameraParagraph =
            cameraMessage.querySelector("p");

        const cameraSmall =
            cameraMessage.querySelector("small");

        if (cameraParagraph) {

            cameraParagraph.innerText =
                hindiMode
                    ? "कैमरा प्रीव्यू"
                    : "Camera preview";

        }

        if (cameraSmall) {

            cameraSmall.innerText =
                hindiMode
                    ? "नीचे Start Camera दबाएँ"
                    : "Click Start Camera below";

        }

    }


    const cameraButton =
        document.querySelector(".camera-btn");

    if (cameraButton) {

        cameraButton.innerText =
            hindiMode
                ? "📷 कैमरा शुरू करें"
                : "📷 Start Camera";

    }


    // ===============================
    // DETECTED SIGN
    // ===============================

    const translationSmall =
        document.querySelector(".translation small");

    if (translationSmall) {

        translationSmall.innerText =
            hindiMode
                ? "पहचाना गया संकेत"
                : "Detected Sign";

    }


    updateGestureLanguage();


    // ===============================
    // REVERSE COMMUNICATION
    // ===============================

    const reverseHeading =
        document.querySelector(".reverse-section .section-heading span");

    if (reverseHeading) {

        reverseHeading.innerText =
            hindiMode
                ? "सैंकेट रिवर्स"
                : "SANKET REVERSE";

    }


    const reverseTitle =
        document.querySelector(".reverse-section .section-heading h2");

    if (reverseTitle) {

        reverseTitle.innerText =
            hindiMode
                ? "बोलें। लिखें। साइन करें।"
                : "Speak. Type. Sign.";

    }


    const reverseDescription =
        document.querySelector(".reverse-section .section-heading p");

    if (reverseDescription) {

        reverseDescription.innerText =
            hindiMode
                ? "आवाज़ या टेक्स्ट को दृश्य साइन मार्गदर्शन में बदलें।"
                : "Convert voice or text into visual sign guidance.";

    }


    const signInput =
        document.getElementById("signInput");

    if (signInput) {

        signInput.placeholder =
            hindiMode
                ? "नमस्ते, मदद या हाँ जैसा कुछ लिखें..."
                : "Type something like Hello, Help or Yes...";

    }


    const reverseButton =
        document.querySelector(".reverse-card .camera-btn");

    if (reverseButton) {

        reverseButton.innerText =
            hindiMode
                ? "🤟 साइन में बदलें"
                : "🤟 Convert to Sign";

    }


    const signOutput =
        document.getElementById("signOutput");

    if (signOutput) {

        if (!signInput.value.trim()) {

            signOutput.innerText =
                hindiMode
                    ? "आपका दृश्य साइन यहाँ दिखाई देगा।"
                    : "Your visual sign will appear here.";

        } else {

            convertToSign();

        }

    }


    // ===============================
    // FEATURES SECTION
    // ===============================

    const featureHeading =
        document.querySelector(".features-section .section-heading");

    if (featureHeading) {

        const span =
            featureHeading.querySelector("span");

        const h2 =
            featureHeading.querySelector("h2");

        const p =
            featureHeading.querySelector("p");


        if (span) {

            span.innerText =
                hindiMode
                    ? "सैंकेट क्या प्रदान करता है"
                    : "WHAT SANKET OFFERS";

        }


        if (h2) {

            h2.innerText =
                hindiMode
                    ? "बिना बाधाओं के संचार।"
                    : "Communication without barriers.";

        }


        if (p) {

            p.innerText =
                hindiMode
                    ? "एक ऐसा प्लेटफ़ॉर्म जो साइन लैंग्वेज, आवाज़ और टेक्स्ट को जोड़ता है।"
                    : "One platform connecting sign language, voice and text.";

        }

    }


    // ===============================
    // FEATURE CARDS
    // ===============================

    const featureCards =
        document.querySelectorAll(".feature-card");


    if (featureCards.length >= 6) {


        // SIGN RECOGNITION

        let h3 =
            featureCards[0].querySelector("h3");

        let p =
            featureCards[0].querySelector("p");

        let button =
            featureCards[0].querySelector("button");


        if (h3) {

            h3.innerText =
                hindiMode
                    ? "साइन रिकग्निशन"
                    : "Sign Recognition";

        }

        if (p) {

            p.innerText =
                hindiMode
                    ? "कैमरे का उपयोग करके समर्थित साइन-लैंग्वेज संकेतों को पहचानें।"
                    : "Use your camera to recognize supported sign-language gestures.";

        }

        if (button) {

            button.innerText =
                hindiMode
                    ? "आजमाएँ →"
                    : "Try it →";

        }


        // VOICE TO TEXT

        h3 =
            featureCards[1].querySelector("h3");

        p =
            featureCards[1].querySelector("p");

        button =
            featureCards[1].querySelector("button");


        if (h3) {

            h3.innerText =
                hindiMode
                    ? "वॉइस से टेक्स्ट"
                    : "Voice to Text";

        }

        if (p) {

            p.innerText =
                hindiMode
                    ? "स्वाभाविक रूप से बोलें और अपनी आवाज़ को पढ़ने योग्य टेक्स्ट में बदलें।"
                    : "Speak naturally and convert your voice into readable text.";

        }

        if (button) {

            button.innerText =
                hindiMode
                    ? "आजमाएँ →"
                    : "Try it →";

        }


        // TEXT TO VOICE

        h3 =
            featureCards[2].querySelector("h3");

        p =
            featureCards[2].querySelector("p");

        button =
            featureCards[2].querySelector("button");


        if (h3) {

            h3.innerText =
                hindiMode
                    ? "टेक्स्ट से आवाज़"
                    : "Text to Voice";

        }

        if (p) {

            p.innerText =
                hindiMode
                    ? "लिखित संचार को प्राकृतिक आवाज़ में बदलें।"
                    : "Convert written communication into natural spoken audio.";

        }

        if (button) {

            button.innerText =
                hindiMode
                    ? "आजमाएँ →"
                    : "Try it →";

        }


        // HINDI + ENGLISH

        h3 =
            featureCards[3].querySelector("h3");

        p =
            featureCards[3].querySelector("p");

        button =
            featureCards[3].querySelector("button");


        if (h3) {

            h3.innerText =
                hindiMode
                    ? "हिंदी + अंग्रेज़ी"
                    : "Hindi + English";

        }

        if (p) {

            p.innerText =
                hindiMode
                    ? "अधिक समावेशी अनुभव के लिए कई भाषाओं में संवाद करें।"
                    : "Communicate using multiple languages for a more inclusive experience.";

        }

        if (button) {

            button.innerText =
                hindiMode
                    ? "स्विच करें →"
                    : "Switch →";

        }


        // LEARN SIGNS

        h3 =
            featureCards[4].querySelector("h3");

        p =
            featureCards[4].querySelector("p");


        if (h3) {

            h3.innerText =
                hindiMode
                    ? "साइन सीखें"
                    : "Learn Signs";

        }

        if (p) {

            p.innerText =
                hindiMode
                    ? "सरल दृश्य मार्गदर्शन के साथ सामान्य संकेतों का अभ्यास करें।"
                    : "Practice commonly used signs with simple visual guidance.";

        }


        // LEARN SIGN ITEMS

        const learnSigns =
            featureCards[4].querySelectorAll(".learn-sign");


        if (learnSigns.length >= 3) {

            const firstStrong =
                learnSigns[0].querySelector("strong");

            const firstSpan =
                learnSigns[0].querySelector("span");

            const secondStrong =
                learnSigns[1].querySelector("strong");

            const secondSpan =
                learnSigns[1].querySelector("span");

            const thirdStrong =
                learnSigns[2].querySelector("strong");

            const thirdSpan =
                learnSigns[2].querySelector("span");


            if (firstStrong) {

                firstStrong.innerText =
                    hindiMode ? "नमस्ते" : "HELLO";

            }

            if (firstSpan) {

                firstSpan.innerText =
                    hindiMode ? "खुली हथेली" : "Open Palm";

            }


            if (secondStrong) {

                secondStrong.innerText =
                    hindiMode ? "मदद" : "HELP";

            }

            if (secondSpan) {

                secondSpan.innerText =
                    hindiMode ? "बंद मुट्ठी" : "Closed Fist";

            }


            if (thirdStrong) {

                thirdStrong.innerText =
                    hindiMode ? "हाँ" : "YES";

            }

            if (thirdSpan) {

                thirdSpan.innerText =
                    hindiMode ? "अंगूठा ऊपर" : "Thumbs Up";

            }

        }


        // EMERGENCY

        h3 =
            featureCards[5].querySelector("h3");

        p =
            featureCards[5].querySelector("p");


        if (h3) {

            h3.innerText =
                hindiMode
                    ? "आपातकालीन मोड"
                    : "Emergency Mode";

        }

        if (p) {

            p.innerText =
                hindiMode
                    ? "सामान्य आपातकालीन संकेतों का उपयोग करके तुरंत जरूरी जरूरतें बताएं।"
                    : "Quickly communicate urgent needs using common emergency signs.";

        }


        const emergencyButtons =
            featureCards[5].querySelectorAll(".emergency-options button");


        if (emergencyButtons.length >= 5) {

            emergencyButtons[0].innerText =
                hindiMode ? "🆘 मदद" : "🆘 HELP";

            emergencyButtons[1].innerText =
                hindiMode ? "🏥 अस्पताल" : "🏥 HOSPITAL";

            emergencyButtons[2].innerText =
                hindiMode ? "👮 पुलिस" : "👮 POLICE";

            emergencyButtons[3].innerText =
                hindiMode ? "🔥 आग" : "🔥 FIRE";

            emergencyButtons[4].innerText =
                hindiMode ? "⚠️ खतरा" : "⚠️ DANGER";

        }

    }


    // ===============================
    // HOW IT WORKS
    // ===============================

    const howSection =
        document.querySelector(".how-section");

    if (howSection) {

        const span =
            howSection.querySelector(".section-heading span");

        const h2 =
            howSection.querySelector(".section-heading h2");


        if (span) {

            span.innerText =
                hindiMode
                    ? "यह कैसे काम करता है"
                    : "HOW IT WORKS";

        }


        if (h2) {

            h2.innerText =
                hindiMode
                    ? "इशारे से संचार तक।"
                    : "From gesture to communication.";

        }


        const steps =
            howSection.querySelectorAll(".step");


        if (steps.length >= 3) {

            const step1h3 =
                steps[0].querySelector("h3");

            const step1p =
                steps[0].querySelector("p");

            const step2h3 =
                steps[1].querySelector("h3");

            const step2p =
                steps[1].querySelector("p");

            const step3h3 =
                steps[2].querySelector("h3");

            const step3p =
                steps[2].querySelector("p");


            if (step1h3) {

                step1h3.innerText =
                    hindiMode
                        ? "साइन दिखाएँ"
                        : "Show a Sign";

            }

            if (step1p) {

                step1p.innerText =
                    hindiMode
                        ? "अपने कैमरे के सामने समर्थित साइन-लैंग्वेज संकेत दिखाएँ।"
                        : "Use your camera to show a supported sign-language gesture.";

            }


            if (step2h3) {

                step2h3.innerText =
                    hindiMode
                        ? "सैंकेट इसे पहचानता है"
                        : "Sanket Recognizes It";

            }

            if (step2p) {

                step2p.innerText =
                    hindiMode
                        ? "सिस्टम संकेत को प्रोसेस करके समर्थित साइन की पहचान करता है।"
                        : "The system processes the gesture and identifies the supported sign.";

            }


            if (step3h3) {

                step3h3.innerText =
                    hindiMode
                        ? "संचार करें"
                        : "Communicate";

            }

            if (step3p) {

                step3p.innerText =
                    hindiMode
                        ? "परिणाम को टेक्स्ट के रूप में दिखाया जा सकता है और आवाज़ में बदला जा सकता है।"
                        : "The result can be displayed as text and converted into voice.";

            }

        }

    }


    // ===============================
    // ABOUT
    // ===============================

    const about =
        document.querySelector(".about-section");

    if (about) {

        const span =
            about.querySelector(".about-content > span");

        const h2 =
            about.querySelector("h2");

        const paragraphs =
            about.querySelectorAll(".about-content p");


        if (span) {

            span.innerText =
                hindiMode
                    ? "सैंकेट क्यों?"
                    : "WHY SANKET?";

        }


        if (h2) {

            h2.innerText =
                hindiMode
                    ? "तकनीक को संचार आसान बनाना चाहिए।"
                    : "Technology should make communication easier.";

        }


        if (paragraphs.length >= 2) {

            paragraphs[0].innerText =
                hindiMode

                    ?

                    "सैंकेट एक accessibility-focused communication platform है जो साइन लैंग्वेज, आवाज़ और बहुभाषी टेक्स्ट को एक साथ लाता है।"

                    :

                    "Sanket is designed as an accessibility-focused communication platform that brings together sign language, voice and multilingual text.";


            paragraphs[1].innerText =
                hindiMode

                    ?

                    "लक्ष्य सरल है: अलग-अलग तरीके से संवाद करने वाले लोगों के बीच बातचीत को अधिक सुलभ बनाना।"

                    :

                    "The goal is simple: make conversations more accessible between people who communicate differently.";

        }

    }


    // ===============================
    // ABOUT FLOATING CARDS
    // ===============================

    const floatingCards =
        document.querySelectorAll(".floating-card");


    if (floatingCards.length >= 3) {

        floatingCards[0].innerText =
            hindiMode
                ? "💬 नमस्ते"
                : "💬 Hello";

        floatingCards[1].innerText =
            hindiMode
                ? "🔊 नमस्ते"
                : "🔊 Namaste";

        floatingCards[2].innerText =
            hindiMode
                ? "❤️ जुड़ें"
                : "❤️ Connect";

    }


    // ===============================
    // FOOTER
    // ===============================

    const footer =
        document.querySelector("footer");

    if (footer) {

        const footerParagraphs =
            footer.querySelectorAll("p");


        if (footerParagraphs.length >= 2) {

            footerParagraphs[0].innerText =
                hindiMode
                    ? "साइन। बोलें। जुड़ें।"
                    : "Sign. Speak. Connect.";


            footerParagraphs[1].innerText =
                hindiMode
                    ? "© 2026 Sanket. सुलभ संचार के लिए बनाया गया।"
                    : "© 2026 Sanket. Built for accessible communication.";

        }

    }

}


// ===============================
// UPDATE GESTURE LANGUAGE
// ===============================

function updateGestureLanguage() {

    const gestureResult =
        document.getElementById("gestureResult");

    const detectedText =
        document.getElementById("detectedText");


    if (stableGesture === "HELLO ✋") {

        if (gestureResult) {

            gestureResult.innerText =
                hindiMode
                    ? "इशारा: नमस्ते 👋"
                    : "Gesture: HELLO ✋";

        }

        if (detectedText) {

            detectedText.innerText =
                hindiMode
                    ? "नमस्ते 👋"
                    : "Hello 👋";

        }

    }


    else if (stableGesture === "HELP ✊") {

        if (gestureResult) {

            gestureResult.innerText =
                hindiMode
                    ? "इशारा: मदद 🆘"
                    : "Gesture: HELP ✊";

        }

        if (detectedText) {

            detectedText.innerText =
                hindiMode
                    ? "मदद 🆘"
                    : "Help 🆘";

        }

    }


    else if (stableGesture === "YES 👍") {

        if (gestureResult) {

            gestureResult.innerText =
                hindiMode
                    ? "इशारा: हाँ 👍"
                    : "Gesture: YES 👍";

        }

        if (detectedText) {

            detectedText.innerText =
                hindiMode
                    ? "हाँ 👍"
                    : "Yes 👍";

        }

    }


    else {

        if (gestureResult) {

            gestureResult.innerText =
                hindiMode
                    ? "इशारा: प्रतीक्षा..."
                    : "Gesture: Waiting...";

        }

        if (detectedText) {

            detectedText.innerText =
                "Waiting...";

        }

    }

}


// ===============================
// GESTURE SPEECH
// ===============================

function speakGesture(gesture) {

    let text = "";


    if (gesture === "HELLO ✋") {

        text =
            hindiMode
                ? "नमस्ते"
                : "Hello";

    }


    else if (gesture === "HELP ✊") {

        text =
            hindiMode
                ? "मदद"
                : "Help";

    }


    else if (gesture === "YES 👍") {

        text =
            hindiMode
                ? "हाँ"
                : "Yes";

    }


    else {

        return;

    }


    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.lang =
            hindiMode ? "hi-IN" : "en-IN";

        speech.rate = 0.9;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);

    }

}


// ===============================
// GESTURE RECOGNITION
// ===============================

function recognizeGesture(landmarks) {

    function distance(a, b) {

        return Math.sqrt(

            Math.pow(a.x - b.x, 2) +
            Math.pow(a.y - b.y, 2)

        );

    }


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


    // OPEN PALM

    if (
        indexOpen &&
        middleOpen &&
        ringOpen &&
        pinkyOpen
    ) {

        return "HELLO ✋";

    }


    // CLOSED FIST / THUMBS UP

    const fingersClosed =
        !indexOpen &&
        !middleOpen &&
        !ringOpen &&
        !pinkyOpen;


    if (fingersClosed) {

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


// ===============================
// GESTURE STABILIZATION
// ===============================

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


    if (pendingCount >= 12) {

        if (stableGesture !== gesture) {

            stableGesture = gesture;

            updateGestureLanguage();

            speakGesture(stableGesture);

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


        const hands =
            new Hands({

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

                    drawConnectors(

                        ctx,
                        landmarks,
                        HAND_CONNECTIONS,
                        {
                            color: "#62dfc1",
                            lineWidth: 4
                        }

                    );


                    drawLandmarks(

                        ctx,
                        landmarks,
                        {
                            color: "#ffffff",
                            lineWidth: 2,
                            radius: 5
                        }

                    );


                    const gesture =
                        recognizeGesture(landmarks);


                    // IMPORTANT:
                    // Do not overwrite the Hindi result here.

                    updateStableGesture(gesture);

                }

            }

        });


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

    }


    catch (error) {

        console.error(error);


        alert(

            hindiMode

                ?

                "कैमरा एक्सेस नहीं हो पाया।\n\n" +
                "कृपया कैमरा अनुमति दें और फिर कोशिश करें।"

                :

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
        document
            .getElementById("signInput")
            .value
            .trim()
            .toLowerCase();


    const output =
        document.getElementById("signOutput");


    if (input === "") {

        output.innerHTML =
            hindiMode
                ? "कृपया पहले कुछ लिखें।"
                : "Please type something first.";

        return;

    }


    // HELLO / NAMASTE

    if (
        input.includes("hello") ||
        input.includes("नमस्ते")
    ) {

        output.innerHTML = `

            <div class="sign-display">

                <div class="sign-emoji">
                    👋
                </div>

                <h2>
                    ${hindiMode ? "नमस्ते" : "HELLO"}
                </h2>

                <p>
                    ${hindiMode ? "खुली हथेली" : "Open palm"}
                </p>

            </div>

        `;

    }


    // HELP / MADAD

    else if (
        input.includes("help") ||
        input.includes("मदद")
    ) {

        output.innerHTML = `

            <div class="sign-display">

                <div class="sign-emoji">
                    ✊
                </div>

                <h2>
                    ${hindiMode ? "मदद" : "HELP"}
                </h2>

                <p>
                    ${hindiMode ? "बंद मुट्ठी" : "Closed fist"}
                </p>

            </div>

        `;

    }


    // YES / HAAN

    else if (
        input.includes("yes") ||
        input.includes("हाँ") ||
        input.includes("हां")
    ) {

        output.innerHTML = `

            <div class="sign-display">

                <div class="sign-emoji">
                    👍
                </div>

                <h2>
                    ${hindiMode ? "हाँ" : "YES"}
                </h2>

                <p>
                    ${hindiMode ? "अंगूठा ऊपर" : "Thumbs up"}
                </p>

            </div>

        `;

    }


    // UNKNOWN WORD

    else {

        output.innerHTML = `

            <div class="sign-display">

                <div class="sign-emoji">
                    🤟
                </div>

                <h2>
                    ${hindiMode ? "साइन गाइड" : "Sign Guide"}
                </h2>

                <p>

                    ${
                        hindiMode
                            ? "इस शब्द के लिए दृश्य संकेत जल्द उपलब्ध होगा।"
                            : "Visual guide coming soon for: " + input
                    }

                </p>

            </div>

        `;

    }

}


// ===============================
// SPEAK DETECTED TEXT
// ===============================

function speakDetectedText() {

    const detectedText =
        document.getElementById("detectedText");


    if (!detectedText) {
        return;
    }


    const text =
        detectedText.innerText;


    if (
        text === "Waiting..." ||
        text === "" ||
        text === "प्रतीक्षा..."
    ) {

        return;

    }


    speakText(text);

}