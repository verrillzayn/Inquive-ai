import { db } from "@/db";
import { openai } from "@/lib/openai";
import { pinecone } from "@/lib/pinecone";
import { SendMessageValidator } from "@/lib/validators/sendMessageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { NextRequest } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const { id: userId } = user!;

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { fileId, message } = SendMessageValidator.parse(body);

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  });

  if (!file) return new Response("Not Found!", { status: 404 });

  await db.message.create({
    data: {
      text: message,
      isUserMessages: true,
      userId,
      fileId,
    },
  });

  // AI things
  // 1: vectorize message

  const pineconeIndex = pinecone.Index("inquive");
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: fileId,
  });

  const results = await vectorStore.similaritySearch(message, 4); // 4 disini itu apa? , kayanya chunks

  const prevMessages = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 10,
  });

  const formattedPrevMessages = prevMessages.map((msg) => ({
    // this fn formated the message to openAI message format
    role: msg.isUserMessages ? ("user" as const) : ("assistant" as const),
    content: msg.text,
  }));

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a very helpful assistant, You are known as a friendly assistant and sometimes like to joke. please use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. Users usually really like it when their name is mentioned, so please say their name whenever possible when answering their question. If possible, please greet the user the first time you give an answer, but if you don't know their name, it's okay not to do that. The following context is data from a PDF, the user will assume he is giving you a PDF, don't deny it and just assume you received a PDF file. if the user mentions 'file' or 'pdf' or 'given pdf' or 'given file' most likely it will refer to the context mentioned below. So let's assume the context provided below is a PDF file
          
          \n----------------\n
    
          CONTEXT:
          ${results.map((r) => r.pageContent).join("\n\n")}
    
          \n----------------\n
    
          PREVIOUS CONVERSATION:
          ${formattedPrevMessages.map((message) => {
            if (message.role === "user") return `User: ${message.content}\n`;
            return `Assistant: ${message.content}\n`;
          })}`,
      },
      {
        role: "user",
        name: user?.given_name!,
        content: `please use previous conversaton (if needed) to answer the my input or question in markdown format. \nIf you don't know the answer, it's okay, just say that you don't know, please don't try to make up an answer.
          
        
    
        MY INPUT OR QUESTION: ${message}`,
      },
    ],
  });

  // streaming response or send back response from ai to client in realtime
  const stream = OpenAIStream(response, {
    // pass calback fn when stream is complete
    async onCompletion(completion) {
      // argument(completion) is respon from ai that is string
      await db.message.create({
        data: {
          text: completion,
          isUserMessages: false,
          fileId,
          userId,
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
};
