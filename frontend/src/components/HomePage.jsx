import { Suspense, useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  VStack,
  GridItem,
  Center,
  Flex,
  InputGroup,
  InputRightElement,
  useBoolean,
  useToast,
  Select,
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import axios from "axios";

import useLocalStorage from "../hooks/useLocalStorage";

import HoldingPage from "./HoldingPage.jsx";

const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useLocalStorage("apiKey", "your-api-key");

  const [model, setModel] = useLocalStorage("model", "gpt-4");
  const [baseUrl, setBaseUrl] = useLocalStorage(
    "baseUrl",
    "https://api.openai.com"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPassword, setShowPassword] = useBoolean();
  const [fileChangeHistory, setFileChangeHistory] = useState([]);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get-history");
        setFileChangeHistory(response.data.history);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleGenerateCode = async () => {
    try {
      setIsGenerating(true);
      const response = await axios.post("http://localhost:3001/generate-code", {
        prompt,
        apiKey,
        baseUrl,
        model,
      });
      setIsGenerating(false);
      if (response.data.success) {
        toast({
          title: "Code generated successfully",
          status: "success",
          duration: 1000,
          position: "top",
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex w="100%" p={4}>
      {/* 左侧对话区域 */}
      <GridItem
        flex="1"
        w="100%"
        p={4}
        borderRight="1px solid #e2e8f0"
        border={{ base: "none", md: "1px solid #e2e8f0" }}
      >
        <VStack spacing={4}>
          <Accordion width="100%" allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading fontSize="l">Settings About LLM</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel py={2}>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="GPT API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={setShowPassword.toggle}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Input
                  placeholder="GPT Base URL"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                />
                <Select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value={"gpt-4o"}>GPT-4o</option>
                  <option value="gemini-pro">Gemini Pro</option>
                </Select>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <HistoryList history={fileChangeHistory} />
          <Textarea
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            loadingText="Generating..."
            isLoading={isGenerating}
            onClick={handleGenerateCode}
          >
            Generate Code
          </Button>
        </VStack>
      </GridItem>

      {/* 右侧预览区域 */}
      <GridItem
        w="100%"
        p={4}
        flex={2}
        border={{ base: "none", md: "1px solid #e2e8f0" }}
      >
        <Center>
          <HoldingPage />
        </Center>
      </GridItem>
    </Flex>
  );
};

const HistoryList = ({ history }) => {
  const loadHistoryFile = async (commitHash) => {
    try {
      ///get-history-file/:commitHash
      const response = await axios.get(
        `http://localhost:3001/get-history-file/${commitHash}`
      );
      console.log(response.data);
      if (response.data) {
        //update-code
        await axios.post("http://localhost:3001/update-code", {
          code: response.data.fileContent,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box width="100%"  >
    <div style={
      {
        borderBottom: "1px solid #e2e8f0",
        borderBottomWidth: "1px",
        borderBottomColor: "#e2e8f0",
        borderBottomStyle: "solid",
        marginBottom: "8px",
        padding: "8px 18px",
      }
    } py={2}>
      <Heading fontSize="l" >File Change History</Heading>
    </div>
      <VStack spacing={2} height={280} alignItems="start" overflow="scroll">

        {history.map((item, index) => (
          <div
            style={{
              cursor: "pointer",
              border: "1px solid #e2e8f0",
              padding: "10px",
              borderRadius: "5px",
            }}
            onClick={() => loadHistoryFile(item.commitHash)}
            key={index}
          >
            {
              <Flex justifyContent="space-between">
                <span>{item.commitDate}:</span>
                <span>{item.commitMessage}</span>
              </Flex>
            }
          </div>
        ))}
      </VStack>
    </Box>
  );
};

export default HomePage;
