let controller = new AbortController(); // Create an AbortController instance

export async function fetchChatResponse(message: string): Promise<string> {
    controller.abort(); // Cancel any previous request before making a new one
    controller = new AbortController(); // Create a new AbortController instance

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
            signal: controller.signal, // Attach the abort signal
        });

        const data = await response.json();
        return data.response || "Sorry, I couldn't process your request.";
    } catch (error: any) {
        if (error.name === "AbortError") {
            console.log("Request was aborted.");
            return "Request was interrupted.";
        }
        console.error("Error fetching AI response:", error);
        return "Sorry, I couldn't process your request.";
    }
}

export function stopChatResponse() {
    controller.abort(); // Call this function to stop an ongoing API request
}
