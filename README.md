# Dream Interpreter Remake

复刻 dreaminterpreter.ai 的核心功能，已改版交互体验并支持 Vercel 部署。

## 功能模块
- 解梦工作台：结构化解析梦境，输出主题、象征、情绪与行动建议
- 梦境艺术：生成视觉风格说明与抽象艺术卡，可下载 PNG
- 梦境地图：按区域聚合梦境记录，支持公开记录展示
- 符号词典：本地词典优先，缺失词条由 AI 补全

## 运行方式
```bash
npm install
npm run dev
```

## 模型配置
在 `.env.local` 中配置：
```bash
DEEPSEEK_API_KEY=your_key
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_BASE_URL=https://api.deepseek.com

QWEN_API_KEY=your_key
QWEN_MODEL=qwen-plus
QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
```

## 可选：Vercel KV
用于跨部署实例共享梦境地图数据（可选）。
```bash
KV_REST_API_URL=your_url
KV_REST_API_TOKEN=your_token
```

## 部署
Vercel 上直接导入仓库即可部署。
