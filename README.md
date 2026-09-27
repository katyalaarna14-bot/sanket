# SANKET — Sign. Speak. Connect. 🤟

### An accessibility-focused web platform for sign, voice and text communication.

**Built by Aarna Katyal**

🌐 **Live Demo:** https://sanket-five.vercel.app/

---

## 📌 About SANKET

**SANKET** is a web-based accessibility platform designed to reduce communication barriers between people who use sign-based gestures and people who communicate primarily through speech or text.

The platform combines **computer vision, gesture recognition, voice input, text-to-speech and visual sign guidance** into one simple communication interface.

SANKET currently recognizes a defined set of supported hand gestures and converts them into understandable text and speech. It also provides a reverse communication mode where typed or spoken input is converted into visual sign guidance.

---

## 🎯 Problem Statement

Communication can become difficult when two people rely on different communication methods.

A person using sign-based communication may need to communicate with someone who does not understand those gestures, while a person communicating through speech may not know how to respond using signs.

SANKET aims to provide a simple digital bridge between these communication methods.

---

## 💡 Solution

SANKET provides two-way communication.

### Sign → Text → Voice

A user shows a supported hand gesture in front of the camera.

```text
Camera
   ↓
Hand Detection
   ↓
Gesture Recognition
   ↓
Text
   ↓
Voice 🔊
```

### Voice / Text → Visual Sign

A user can speak or type a message.

```text
Voice / Text
     ↓
Input Processing
     ↓
Visual Sign Guidance
```

This creates a simple communication loop between gesture-based and speech/text-based interaction.

---

## ✨ Features

### 📷 Camera-Based Gesture Recognition

Uses the device camera and hand landmark detection to recognize supported gestures in real time.

Currently supported:

| Gesture       | Meaning |
| ------------- | ------- |
| 👋 Open Palm  | HELLO   |
| ✊ Closed Fist | HELP    |
| 👍 Thumbs Up  | YES     |

---

### 📝 Gesture to Text

Recognized gestures are displayed as readable text inside the Communication Hub.

Example:

```text
👋 → HELLO
```

---

### 🔊 Gesture to Voice

Detected gestures can be converted into speech using browser text-to-speech functionality.

Example:

```text
HELLO → 🔊 "Hello"
```

---

### 🎙️ Voice to Text

Users can speak into the microphone and convert their speech into text directly inside the platform.

---

### 🤟 Reverse Communication

Users can type a message or use voice input and receive visual guidance for supported signs.

Example:

```text
"Hello"
   ↓
👋
HELLO
Open Palm
```

---

### 📚 Learn Signs

A dedicated learning section introduces supported gestures with simple visual guidance.

Currently included:

* 👋 HELLO — Open Palm
* ✊ HELP — Closed Fist
* 👍 YES — Thumbs Up

---

### 🚨 Emergency Mode

Provides quick-access communication options for urgent situations:

* 🆘 HELP
* 🏥 HOSPITAL
* 👮 POLICE
* 🔥 FIRE
* ⚠️ DANGER

The options can provide spoken output using the browser's speech synthesis feature.

---

### 🌐 Hindi / English Interface

The interface includes a Hindi/English language switching option to make the experience more accessible to different users.

---

### 📱 Responsive Interface

The interface is designed to adapt to smaller screens and includes responsive layouts for cards, buttons and communication sections.

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Computer Vision

* MediaPipe Hands
* Hand landmark detection
* Rule-based gesture recognition

### Browser APIs

* Web Speech API
* Speech Recognition
* Speech Synthesis
* `getUserMedia()` for camera access

### Deployment

* GitHub
* Vercel

---

## 🔄 How Gesture Recognition Works

SANKET uses hand landmarks detected through MediaPipe Hands.

The system analyzes the relative positions of different hand landmarks to determine whether fingers are open or closed.

For example:

```text
Open fingers
     ↓
Open Palm
     ↓
HELLO
```

or:

```text
Closed fingers
     ↓
Closed Fist
     ↓
HELP
```

A stabilization mechanism requires the same gesture to remain detected for multiple frames before accepting it. This helps reduce accidental changes caused by individual unstable camera frames.

---

## 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/katyalaarna14-bot/sanket.git
```

Open the project folder:

```bash
cd sanket
```

The project can be served using a simple local web server.

For example:

```bash
npx.cmd http-server
```

Then open the local URL provided by the server.

---

## 🌐 Live Deployment

SANKET is deployed using Vercel.

### Live Demo

**https://sanket-five.vercel.app/**

The deployed version allows users to interact with the project directly through a browser.

Camera and microphone features require the appropriate browser permissions.

---

## ⚠️ Current Limitations

SANKET is currently a prototype with a **defined set of supported gestures**.

It should not be considered a complete Indian Sign Language translation system.

The current version focuses on demonstrating the communication workflow using three supported gestures:

* HELLO
* HELP
* YES

Recognition can also be affected by camera quality, lighting, hand position and visibility.

---

## 🔮 Future Scope

Future versions of SANKET could include:

* 🤟 A larger gesture vocabulary
* 🇮🇳 More comprehensive Indian Sign Language support
* 🧠 Machine-learning-based gesture classification
* 🎥 Continuous sign sequence recognition
* 🗣️ More Indian language voice support
* 📱 Dedicated mobile application
* 👥 Real-time two-person communication mode
* 📖 Interactive sign-language learning modules
* ♿ Additional accessibility features
* ☁️ Cloud-based personalization and analytics

---

## 🎯 Vision

The long-term vision of SANKET is to create a more accessible communication layer where **sign, speech and text can work together instead of becoming barriers.**

> **Sign. Speak. Connect.**
---
