const fs = require('fs');
const path = require('path');

const  previewPageContent =`

import { Box} from '@chakra-ui/react';

const PreviewPage = () => {
  return (
    <Box>
      <h1>Preview Page</h1>
    </Box>
  );
}

export default PreviewPage;
`;

// 从环境变量中获取是否是 Docker 环境
const isDockerEnv =  process.env.IS_DOCKER_ENV;

console.log('isDockerEnv:', isDockerEnv)

const codeFilePath = isDockerEnv
  ? path.join(__dirname, '/src/components', 'PreviewPage.jsx')
  : path.join(__dirname, '../frontend/src/components', 'PreviewPage.jsx');

console.log('codeFilePath:', codeFilePath)

const readCode = () => {
    if (!fs.existsSync(codeFilePath)) return previewPageContent;
    return fs.readFileSync(codeFilePath, 'utf8') || previewPageContent;
};

const writeCode = (code) => {
    fs.writeFileSync(codeFilePath, code,
        { encoding: 'utf8', flag: 'w' }
    );
};

module.exports = {
    readCode,
    writeCode
};
