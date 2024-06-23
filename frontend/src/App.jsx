import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import PreviewPage from "./components/PreviewPage";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box w="100vw" h="100vh">
          <Routes>
            <Route path="/" element={<HomePage />} >
                <Route path="/" element={<PreviewPage />} />
            </Route>
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
