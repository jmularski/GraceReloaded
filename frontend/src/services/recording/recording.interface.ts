declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
        mozSpeechRecognition: any;
        msSpeechRecognition: any;
        oSpeechRecognition: any;
    }
}

export interface UseRecording {
    startRecording: () => void,
    stopRecording: () => void
}