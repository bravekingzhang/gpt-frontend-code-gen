# 前端页面/组件生成神器

这是一个使用 React 和 Vite 构建的前端项目，配合 Koa 框架的后端服务，实现了一个前端页面生成并预览的功能，而且基于对话，可以不断调整页面效果。老板说要看一个交互效果，分分钟就出来啦。

![](https://raw.githubusercontent.com/bravekingzhang/pic_go/master/2024/10/31/1730375359551-ecbd116d-f76d-4a88-8ef8-ddf8ff6a11f8.png)


![](https://raw.githubusercontent.com/bravekingzhang/pic_go/master/2024/10/31/1730375321849-3f6964e6-dd37-4fa8-8d83-cb942476d38e.png)

![](https://raw.githubusercontent.com/bravekingzhang/pic_go/master/2024/10/31/1730375525069-3d2c6ce6-bfa2-4b17-a782-4143f5be7d4e.png)


## 功能

- 使用 GPT-4 生成 React 组件。
- ShadcnUI 风格组件生成。
- 实时预览生成的组件。
- 通过持续对话修改和更新组件。
- 配置自己的 APIKey 和 BaseUrl，支持多种大模型。
- 使用 Docker 和 Docker Compose 一键设置和启动。

## 技术栈

- 前端：React, vite
- 后端：Koa

## 快速开始

### 前提条件

确保你的开发环境中已安装 Node.js（18以上） 和 Docker（可选），但是推荐 Docker 启动，真的很傻瓜式。

### 安装依赖

分别为前端和后端安装依赖，然后在根目录启动：

```bash
yarn start
```

打开浏览器，访问 `http://localhost:9000`，即可看到前端页面，配置自己的 APIKey，和 BaseUrl。就可以愉快的玩耍了。建议使用 one-api，这样，所以的大模型都可以使用。

## docker 一键启动

强烈推荐使用 Docker 一键启动，真的很傻瓜式。

```sh
docker-compose up -d --build
```

## TODO

- [ ] 支持vue、angular等前端框架组件生成，甚至是 Flutter。
- [x] 支持代码预览，编辑。
- [x] 支持生成 ShadcnUI 组件。
- [x] 保留历史步骤的生成记录，支持选择预览历史生成的组件。
- [ ] 支持多个大模型生成效果对比。

## License

本项目的代码和文档基于[知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)。此协议允许用户在非商业目的下自由使用和分发，但进行商业用途需要获得授权。

## 支持

如果你觉得这个项目对你有帮助，可以请作者喝杯咖啡，感谢你的支持。

<img width="200" alt="image" src="https://github.com/bravekingzhang/react-ai-chat/assets/4476322/7c457992-a0bc-49a3-9bd6-f23b5f1a595e">

关注作者微信公众号，**老码沉思录**，与作者交流。
<img width="200" alt="image" src="https://raw.githubusercontent.com/bravekingzhang/pic_go/master/2024/03/29/1711677809867-40f26109-8ac4-45de-b8b2-cbf78ad09cff.png">


