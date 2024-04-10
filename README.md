# Advanced Retrieval-Augmented Generation (RAG) web app

This advanced Retrieval-Augmented Generation (RAG) web app is based on the [LlamaIndex](https://www.llamaindex.ai/) project using [Next.js](https://nextjs.org/) bootstrapped with [create-llama](https://www.npmjs.com/package/create-llama).

You might therefore have to install [Node.js](https://nodejs.org/en) first.

The front-end is a Next.js (React) TypeScript (JavaScript) web app.

This web app also contains two different types of agents (tools).

The first one is the [Wikipedia tool](https://llamahub.ai/l/tools/llama-index-tools-wikipedia) provided by LlamaIndex.

The second one is a custom FunctionTool in the `chat.ts` file. This custom function writes the first name in lower case letters and the last name in upper case letters. This is in itself not very useful, but you can easily change it to any functionality you like. You just have to change the custom function and the JSON (parameter) description of the custom function accordingly.

First, install the dependencies:

```
npm install
```

You will need to supply your own OpenAI API key. You can supply your OpenAI API key either via the `.env` file, or through an environment variable called `OPENAI_API_KEY`. If you don't want to use OpenAI, then you can change the web app to use any of the Large Language Models (LLMs) that LlamaIndex supports, including local models.

[Pinecone](https://www.pinecone.io/) is used as Vector Store (database). You can use a free Pinecone pod-based index of the "Chatbot" type. You can give your index any name you like. If you use the GPT-3.5 Large Language Model, then you will have to set the configuration to "text-embedding-ada-002" ("1536" dimension and "cosine" metric). You will then have to supply these 3 settings either through environment variables, or via the `.env` file like this:

```
PINECONE_API_KEY=<REPLACE_THIS_WITH_YOUR_FREE_PINECONE_API_KEY>
PINECONE_ENVIRONMENT=https://<YOUR_PINECONE_INDEX_NAME-xxxxxxxxx>.pinecone.io
PINECONE_INDEX_NAME=<REPLACE_THIS_WITH_YOUR_PINECONE_INDEX_NAME>
```

If you don't use the `.env` file, then you will also have to set these two environment variables (assumed that you use GPT-3.5):

```
MODEL=gpt-3.5-turbo-0125
NEXT_PUBLIC_MODEL=gpt-3.5-turbo-0125
```

The web app ingests all files of the `./data` directory. This directory already contains an example PDF document about "RAG vs Fine-Tuning". It is a study from Microsoft AI about the impact of fine-tuning and Retrieval-Augmented Generation (RAG) on Large Language Models (LLMs) in agriculture.

You can ingest PDF, text, CSV, Markdown, Word and HTML files. However, before you can query your data, you need to generate the embeddings of the documents that you have stored in the `./data` directory:

```
npm run generate
```

You can then start the web app locally with:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![image](https://github.com/botextractai/ai-web-agent-rag/assets/159737833/7c12bed9-6846-4eff-8202-0fc1132cbdc9)
Here are some ideas for prompts that you can try:

```
Summarize the document about "RAG VS FINE-TUNING"
Using the Wikipedia tool, who won Super Bowl LVIII?
Format first and last name: John Doe
```
