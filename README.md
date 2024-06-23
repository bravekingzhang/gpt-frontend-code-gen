# 前端页面/组件生成神器

这是一个使用 React 和 Vite 构建的前端项目，配合 Koa 框架的后端服务，实现了一个前端页面生成并预览的功能，而且基于对话，可以不断调整页面效果。老板说要看一个交互效果，分分钟就出来啦。

#### 看看效果

**step1**: 一句话生成一个前端页面，让你的前端开发效率提升数倍。

<img  src="https://cdn.jsdelivr.net/gh/bravekingzhang/pic_go@master/vscode/219bbde8839c426c9ba84a9da76640ba0f4c8f0e196aa02ac536c977c8f33ea8.png" width="60%">

**step2**：持续迭代，告诉他，修改下风格为 iOS 风格。

<img  src="https://cdn.jsdelivr.net/gh/bravekingzhang/pic_go@master/vscode/84ca16c261fedabaf7ae2e14b4e87f465f2a6561f67839e51ab40c75013e0241.png" width="60%">

**step3**：继续让他在修改下布局，完美了。

<img src="https://cdn.jsdelivr.net/gh/bravekingzhang/pic_go@master/vscode/7832d0c7e562dc9dcce53ca57be68bfdbd1b4a83b43ee14e9680a9c9ebaa87c1.png" width="60%">


这一切，你只需要告诉他，我要一个什么样的页面，他就会给你生成出来，然后你可以不断的和他对话，让他帮你修改，直到你满意为止。

## 功能

- 使用 GPT-4 生成 React 组件。
- 实时预览生成的组件。
- 通过持续对话修改和更新组件。
- 配置自己的 APIKey 和 BaseUrl，支持多种大模型。
- 使用 Docker 和 Docker Compose 一键设置和启动。

## 技术栈

- 前端：React, Chakra UI, vite
- 后端：Koa

## 快速开始

### 前提条件

确保你的开发环境中已安装 Node.js（18以上） 和 Docker（可选），但是推荐 Docker 启动，真的很傻瓜式。

### 安装依赖

在项目的根目录下，分别为前端和后端安装依赖，启动：

```sh
# 安装前端依赖
cd frontend
npm install
npm run dev

# 安装后端依赖
cd ../server
npm install
npm run dev
```

打开浏览器，访问 `http://localhost:9000`，即可看到前端页面，配置自己的 APIKey，和 BaseUrl。就可以愉快的玩耍了。建议私用 one-api，这样，所以的大模型都可以使用。

## docker 一键启动

强烈推荐使用 Docker 一键启动，真的很傻瓜式。

```sh
docker-compose up -d --build
```

## TODO

- [ ] 支持vue、angular等前端框架组件生成，甚至是 Flutter。
- [ ] 支持代码预览，编辑。
- [ ] 保留历史步骤的生成记录，支持选择预览历史生成的组件。
- [ ] 支持多个大模型生成效果对比。

## License

本项目的代码和文档基于[知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)。此协议允许用户在非商业目的下自由使用和分发，但进行商业用途需要获得授权。

## 支持

如果你觉得这个项目对你有帮助，可以请作者喝杯咖啡，感谢你的支持。

<img width="200" alt="image" src="https://github.com/bravekingzhang/react-ai-chat/assets/4476322/7c457992-a0bc-49a3-9bd6-f23b5f1a595e">

关注作者微信公众号，与作者交流，第一时间知道作者动态？
<img width="600" alt="image" src="https://raw.githubusercontent.com/bravekingzhang/pic_go/master/2024/02/22/1708602722259-32c72eeb-4eb7-475e-8029-eb2873a06650.png">


