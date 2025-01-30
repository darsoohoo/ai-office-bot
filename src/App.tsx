
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { startListening } from "./utils/speechRecognition";
import { speak } from "./utils/textToSpeech";

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


export default function App() {
  const [transcript, setTranscript] = useState("");
  useEffect(() => {
    startListening((text) => setTranscript(text));
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>
        <h1>Listening...</h1>
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
