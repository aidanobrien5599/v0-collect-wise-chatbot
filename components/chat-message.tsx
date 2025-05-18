import type { Message } from "@/types"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  // Check if the message contains a payment link
  const containsPaymentLink = message.content.includes("collectwise.com/payments")

  // If it contains a payment link, split the message to render the link separately
  let messageContent = message.content
  let paymentLink = ""

  if (containsPaymentLink) {
    const parts = message.content.split(/(collectwise\.com\/payments\?[^\s]+)/)
    messageContent = parts.filter((part, index) => index !== 1).join("")
    paymentLink = parts[1]
  }

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800",
        )}
      >
        <div className="whitespace-pre-wrap">{messageContent}</div>

        {paymentLink && (
          <a
            href={`https://${paymentLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-600 underline hover:text-blue-800 bg-white px-3 py-1 rounded"
          >
            {paymentLink}
          </a>
        )}
      </div>
    </div>
  )
}
