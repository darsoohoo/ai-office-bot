import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
    it("renders Start Listening button", () => {
        render(<App />);
        const startButton = screen.getByText("Start Listening");
        expect(startButton).toBeTruthy();
    });

    it("renders Stop Listening button", () => {
        render(<App />);
        const stopButton = screen.getByText("Stop Listening");
        expect(stopButton).toBeTruthy();
    });

    it("renders Stop Response button", () => {
        render(<App />);
        const stopResponseButton = screen.getByText("Stop Response");
        expect(stopResponseButton).toBeTruthy();
    });

    it("Start Listening button is disabled when listening", () => {
        render(<App />);
        const startButton = screen.getByText("Start Listening");
        fireEvent.click(startButton);
        expect(startButton).toBeDisabled();
    });

    it("Stop Listening button is enabled when listening", () => {
        render(<App />);
        const startButton = screen.getByText("Start Listening");
        fireEvent.click(startButton);
        const stopButton = screen.getByText("Stop Listening");
        expect(stopButton).toBeEnabled();
    });

    it("Stop Response button stops AI response", () => {
        render(<App />);
        const stopResponseButton = screen.getByText("Stop Response");
        fireEvent.click(stopResponseButton);
        // Add assertions to check if AI response is stopped
    });
});