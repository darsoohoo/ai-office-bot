const synth = window.speechSynthesis; // Store speech synthesis instance

export function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set language
    utterance.rate = 1; // Adjust speaking speed if needed
    window.speechSynthesis.speak(utterance);
}


export function stopSpeaking() {
    if (synth.speaking) {
        synth.cancel(); // Immediately stop any ongoing speech
    }
}