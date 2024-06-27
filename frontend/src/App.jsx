import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import React,{lazy} from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const PreviewPage = lazy(() => import('./components/PreviewPage'));

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box w="100vw" h="100vh">
          <Routes>
            <Route path="/" element={<HomePage />} >
                <Route path="/" element={
                    <ErrorBoundary>
                       <PreviewPage />
                    </ErrorBoundary>
                } />
            </Route>
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
