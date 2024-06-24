import React, { useState, Suspense, useEffect } from "react";
import {
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";

const HoldingPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [code, setCode] = useState(`hahah`);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-code");
        const data = await response.json();
        setCode(data.code);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }
  , []);

  const writeCode = async (code) => {
    try {
      await fetch("http://localhost:3001/update-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      setCode(code);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box p={4} width="100%" height="100%" mx="auto">
      <Tabs variant="line">
        <TabList>
          <Tab>Preview</Tab>
          <Tab>Code</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex justifyContent="center" flexDirection="column">
              <Flex>
                <FormLabel htmlFor="mobile">Show Mobile Design</FormLabel>
                <Switch
                  id="mobile"
                  isChecked={isMobile}
                  onChange={() => setIsMobile(!isMobile)}
                />
              </Flex>

              <Box
                py={4}
                borderRadius="lg"
                width={isMobile ? "375px" : "100%"}
                height={"667px"}
                overflow="scroll"
                alignSelf="center"
              >
                <Suspense fallback={<Loading />}>
                  <Outlet />
                </Suspense>
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Box p={4} bg="gray.200" borderRadius="lg" height="667px">
              <MonacoEditor
                height="100%"
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={(value) => writeCode(value)}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                }}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const Loading = () => {
  return <div>Loading...</div>;
};

export default HoldingPage;
