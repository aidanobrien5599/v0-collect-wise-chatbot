'use server'

import { NextResponse } from "next/server"
import { b } from "../../../baml_client/async_client"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Format the entire conversation history for the BAML function
    const conversationHistory = messages
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n\n")

    // Get the last user message for logging
    const lastUserMessage = messages.filter((msg: any) => msg.role === "user").slice(-1)[0]?.content

    console.log("Last user message:", lastUserMessage)
    console.log("Full conversation history being sent to BAML:")
    console.log(conversationHistory)

    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message provided" }, { status: 400 })
    }

    // Pass the full conversation history to BAML
    const assistantResponse = await b.Negotiator(conversationHistory)

    return NextResponse.json({ message: assistantResponse })
  } catch (error) {
    console.error("Error in chat API with BAML:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
