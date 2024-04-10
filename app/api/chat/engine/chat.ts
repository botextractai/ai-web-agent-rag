import {
  BaseTool,
  OpenAI,
  OpenAIAgent,
  QueryEngineTool,
  FunctionTool,
  ToolFactory,
} from "llamaindex";
import fs from "node:fs/promises";
import path from "node:path";
import { getDataSource } from "./index";

export async function createChatEngine(llm: OpenAI) {
  let tools: BaseTool[] = [];

  // The custom agent function
  // @ts-ignore
  function lowerFirstUpperLast({a,b}) {
    return a.toLowerCase() + " " +  b.toUpperCase();
  }

  // Description of the custom agent function
  const lowerFirstUpperLastJSON = {
    type: "object",
    properties: {
      a: {
        type: "string",
        description: "The first name",
      },
      b: {
        type: "string",
        description: "The last name",
      },
    },
    required: ["a", "b"],
  };

  // Add a query engine tool if we have a data source
  // Add the (custom agent) function tool
  const index = await getDataSource(llm);
  if (index) {
    tools.push(
      new QueryEngineTool({
        queryEngine: index.asQueryEngine(),
        metadata: {
          name: "data_query_engine",
          description: `A query engine for documents in storage folder: ./data`,
        },
      }),
      new FunctionTool(lowerFirstUpperLast, {
        name: "lowerFirstUpperLast",
        description: "Use this function to format first and last name",
        parameters: lowerFirstUpperLastJSON,
      }),
    );
  }

  try {
    // add tools from config file if it exists
    const config = JSON.parse(
      await fs.readFile(path.join("config", "tools.json"), "utf8"),
    );
    tools = tools.concat(await ToolFactory.createTools(config));
  } catch {}

  return new OpenAIAgent({
    tools,
    llm,
    verbose: true,
  });
}
