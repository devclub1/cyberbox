import React from 'react';
import Container from 'components/Container/Container';
import { UserContextProvider } from 'contexts/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Container />
    </UserContextProvider>
  );
}

export default App;
