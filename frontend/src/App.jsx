import { ChakraProvider, Box,  } from '@chakra-ui/react';
import { BrowserRouter as Router, } from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
  return (
    <ChakraProvider>
      <Router>
          <Box w='100vw' h="100vh">
            <HomePage />
          </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
