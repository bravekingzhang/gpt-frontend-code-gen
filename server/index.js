const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');

//config cors ,allow all
const cors = require('@koa/cors');

const { readCode, writeCode } = require('./history');

const app = new Koa();
const router = new Router();

// 中间件
app.use(bodyParser());
app.use(cors());

// 处理 GPT 请求的路由
router.post('/generate-code', async (ctx) => {
    const { prompt, apiKey, baseUrl,model } = ctx.request.body;

    try {
        const currentCode = readCode();

        // 构建请求数据
        const messages = [
            { role: 'system', content: `You are a professional front-end developer. Only provide the complete and functional implementation code without any additional explanations, whether modifying existing code or writing from scratch.
                always use React + Chakra UI for the implementation.` }
        ];

        if (currentCode) {
            messages.push({ role: 'user', content: `Current code:\n${currentCode}` });
        }

        messages.push({ role: 'user', content: prompt });

        const requestData = {
            messages,
            model,
            max_tokens: 4096
        };

        // 发送请求给 GPT
        const response = await axios.post(`${baseUrl}/v1/chat/completions`, requestData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // console.log('response:', response.data, '\n');

        const generatedCode = response.data.choices[0].message.content;
        // 更新代码
        writeCode(generatedCode);

        console.log('Generated code:', generatedCode,'\n');

        ctx.body = {
            success: true,
            generatedCode
        };
    } catch (error) {
        ctx.body = {
            success: false,
            error: error.message
        };
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
