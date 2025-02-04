
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { startListening } from "./utils/speechRecognition";
import { fetchChatResponse, stopChatResponse } from "./utils/fetchChatResponse";
import { speak, stopSpeaking } from "./utils/textToSpeech";

async function sendToAI(message: string) {
  const response = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  return data.response;
}

async function handleSpeech(text: string) {
  const response = await sendToAI(text);
  speak(response);
}

const fetchData = async () => {
  try {
    const response = await fetch('/api/test');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data); // Handle the data from the response as needed
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }}


export default function App() {
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState(""); // AI response text
  const [isListening, setIsListening] = useState(false); // Track listening state

  const handleStartListening = () => {
    stopChatResponse(); // Stop any ongoing AI response
    stopSpeaking(); // Stop speech output

    setIsListening(true);
    startListening(async (text) => {
      setTranscript(text);
      setIsListening(false); // Stop listening after receiving text

      const response = await fetchChatResponse(text);
      setAiResponse(response);
      speak(response);
    });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>
        <h1>Listening...</h1>

        {/* Stop Button to interrupt AI response */}
        {/* Start Listening Button */}
        <button onClick={handleStartListening} disabled={isListening}>
          {isListening ? "Listening..." : "Start Listening"}
        </button>
        <button onClick={() => setIsListening(false)} disabled={!isListening}>
          Stop Listening
        </button>

        {/* Stop Button to interrupt AI response */}
        <button onClick={() => { stopChatResponse(); stopSpeaking(); }}>
          Stop Response
        </button>
        <p>{transcript}</p>
      </div>
      <Canvas>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        {/* Camera Controls */}
        <OrbitControls />

        {/* 3D Object (Blue Sphere) */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>

      </Canvas>
    
    </div>
  );
}
