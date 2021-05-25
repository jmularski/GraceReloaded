import React from 'react';
import { Chat } from './components/functional/Chat';
import { MessageProvider } from './store/message/message.context';

function App() {
  return (
    <MessageProvider>
      <Chat />
    </MessageProvider>
  );
}

export default App;
