"use client"

import { useState, useRef, useEffect } from "react"
import type { Message } from "@/types"
import { ChatInput } from "./chat-input"
import { ChatMessage } from "./chat-message"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! Our records show that you currently owe $2400. Are you able to resolve this debt today?",
    },
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.message,
        },
      ])
    } catch (error) {
      console.error("Error sending message:", error)
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Sorry, there was an error processing your request. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const resetChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! Our records show that you currently owe $2400. Are you able to resolve this debt today?",
      },
    ])
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden bg-white shadow-md">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Payment Negotiation</h2>
        <Button variant="outline" size="sm" onClick={resetChat}>
          Reset Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading && (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
            <p className="text-sm text-gray-500">Thinking...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <ChatInput onSend={addMessage} disabled={loading} />
      </div>
    </div>
  )
}
