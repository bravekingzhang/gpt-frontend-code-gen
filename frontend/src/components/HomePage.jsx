import { Suspense, useEffect, useState } from "react";
import { MdBuild, MdCreateNewFolder } from "react-icons/md";
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
  Switch,
  HStack,
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

  const [useShadcnUI, setUseShadcnUI] = useLocalStorage("useShadcnUI", false);

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

  const newPage = async () => {
    try {
      const response = await axios.post("http://localhost:3001/new-page",{
        useShadcnUI,
      });
      if (response.data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleGenerateCode = async () => {
    try {
      setIsGenerating(true);
      const response = await axios.post("http://localhost:3001/generate-code", {
        useShadcnUI,
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
          <Accordion
            width="100%"
            allowToggle
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
            }}
          >
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
                  <option value="deepseek-coder">DeepSeek Coder</option>
                  <option value="deepseek-chat">DeepSeek Chat</option>
                </Select>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <HistoryList history={fileChangeHistory} />
          <HStack
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: " 4px",
            width: "100%",
            boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
          }}
          >
          <Textarea
          flex="1"
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <VStack
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "8px 18px",
            boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
          }}
            alignItems="center"
            justifyContent="space-between"
           >
           <span
           style={{
            height: "100%",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#2d3748",
           }}
           >Shadcn UI</span>
            <Switch
              id="mobile"
              isChecked={useShadcnUI}
              onChange={() => setUseShadcnUI(!useShadcnUI)}
            />
          </VStack>
          </HStack>
          <HStack>
            <Button
              leftIcon={<MdCreateNewFolder />}
              colorScheme="blue"
              onClick={newPage}
            >
              New Page
            </Button>

            <Button
              leftIcon={<MdBuild />}
              colorScheme="green"
              isDisabled={!prompt || !apiKey}
              loadingText="Generating..."
              isLoading={isGenerating}
              onClick={handleGenerateCode}
            >
              Generate Code
            </Button>
          </HStack>
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

const HistoryItem = ({ item }) => {
  return (
    <div>
      <div>
        <strong>Commit Time:</strong> {item.commitDate}
      </div>
      <div>
        <strong>Commit Message:</strong> {item.commitMessage}
      </div>
    </div>
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
    <Box
      width="100%"
      style={{
        border: "1.5px solid #e2e8f0",
        borderRadius: "8px",
        padding: "8px",
        boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #e2e8f0",
          borderBottomWidth: "1px",
          borderBottomColor: "#e2e8f0",
          borderBottomStyle: "solid",
          marginBottom: "8px",
          padding: "8px 8px",
        }}
        py={2}
      >
        <Heading fontSize="l">File Change History</Heading>
      </div>
      <VStack spacing={2} height={280} alignItems="start" overflow="scroll">
        {history.map((item, index) => (
          <div
            style={{
              cursor: "pointer",
              border: "1px solid #e2e8f0",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "14px",
              width: "100%",
              // 阴影
              boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
            }}
            onClick={() => loadHistoryFile(item.commitHash)}
            key={index}
          >
            {
              <Flex justifyContent="space-between">
                <HistoryItem item={item} />
              </Flex>
            }
          </div>
        ))}
      </VStack>
    </Box>
  );
};

export default HomePage;
