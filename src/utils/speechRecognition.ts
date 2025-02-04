
let recognition: SpeechRecognition | null = null;
export function startListening(callback: (text: string) => void) {
    // Ensure compatibility across browsers
    const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.error("Speech Recognition is not supported in this browser.");
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        callback(transcript);
    };

    recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event);
    };

    recognition.start();
}


export function stopListening() {
    if (recognition) {
        recognition.stop();
    }
}