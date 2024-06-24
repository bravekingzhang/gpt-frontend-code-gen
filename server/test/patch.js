const { applyPatch,createTwoFilesPatch, createPatch, diffChars } = require('diff');

const sourceCode = `
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const PreviewPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email);
  };

  return (
    <Container>

      <Center>
        <h3>code Generate Preview Page</h3>
      </Center>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Container>
  );
}

export default PreviewPage;
`

const sourceCode2 = `
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const PreviewPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email);
  };

  return (
    <Container>

      <Center>
        <h3>User Generate Preview Page</h3>
      </Center>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Container>
  );
}

export default PreviewPage;
`

const patch = `
Index: frontend/src/components/PreviewPage.jsx
===================================================================
--- frontend/src/components/PreviewPage.jsx
+++ frontend/src/components/PreviewPage.jsx
@@ -1,23 +1,32 @@
 import React, { useState } from "react";
 import {
   Box,
   Button,
   Center,
   Container,
   FormControl,
   FormLabel,
   Input,
   VStack,
+  Heading,
+  Checkbox,
+  Text,
 } from "@chakra-ui/react";

 const PreviewPage = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
+  const [terms, setTerms] = useState(false);

   const handleSubmit = (e) => {
     e.preventDefault();
     console.log(name, email);
   };

   return (
     <Container>
       <Center>
-        <h3>code Generate Preview Page</h3>
+        <Heading as="h3" size="lg">User Registration</Heading>
       </Center>
       <VStack spacing={4}>
         <FormControl>
@@ -25,12 +34,19 @@
           <Input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
           />
         </FormControl>
         <FormControl>
           <FormLabel>Email</FormLabel>
           <Input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
         </FormControl>
+        <FormControl>
+          <Checkbox isChecked={terms} onChange={(e) => setTerms(e.target.checked)}>
+            <Text>I agree to the Terms and Conditions</Text>
+          </Checkbox>
+        </FormControl>
         <Button onClick={handleSubmit} isDisabled={!terms}>Submit</Button>
       </VStack>
     </Container>
   );
 }

export default PreviewPage;
`

const patch2 =  createPatch('frontend/src/components/PreviewPage.jsx', sourceCode, sourceCode2);
console.log(patch2);
const updatedCode = applyPatch(sourceCode, patch);

console.log(updatedCode);