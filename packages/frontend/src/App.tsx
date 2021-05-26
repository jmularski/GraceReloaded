import React from 'react';
import {Chat} from './components/functional/Chat';
import {MessageProvider} from './store/message/message.context';
import {ThemeProvider} from 'styled-components';
import {theme} from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MessageProvider>
        <Chat />
      </MessageProvider>
    </ThemeProvider>
  );
}

export default App;
