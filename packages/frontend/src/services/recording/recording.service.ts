import {useEffect} from 'react';
import {UseRecording} from './recording.interface';


export const useRecording: (
    setText: ((text: string) => void)
  ) => UseRecording = (setText) => {
    // next 2 statetments from https://github.com/JamesBrill/react-speech-recognition
    const DefaultSpeechRecognition =
        typeof window !== 'undefined' &&
        (window.SpeechRecognition ||
            window.webkitSpeechRecognition ||
            window.mozSpeechRecognition ||
            window.msSpeechRecognition ||
            window.oSpeechRecognition);

    const hasSpeechRecognitionCapabilities = !!DefaultSpeechRecognition;

    let recognition: SpeechRecognition;

    useEffect(() => {
      if (hasSpeechRecognitionCapabilities) {
        recognition = new DefaultSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const {transcript} = event.results[current][0];

          setText(transcript);
        };
      }
    }, []);

    const startRecording = () => {
      if (recognition) {
        recognition.start();
      }
    };

    const stopRecording = () => {
      if (recognition) {
        recognition.stop();
      }
    };

    return {
      startRecording,
      stopRecording,
    };
  };
