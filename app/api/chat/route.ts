import { OpenAI } from "openai"
import { NextResponse } from "next/server"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `
You are a debt negotiation assistant for CollectWise, a company that helps people manage and resolve their financial obligations.

Your goal is to negotiate payment terms with users who cannot pay their debt in full. Follow these guidelines:

1. Be empathetic and understanding of the user's financial situation.
2. Offer payment plans as monthly, biweekly, or weekly installments.
3. Suggest realistic payment options based on the total debt amount.
4. Do NOT accept unrealistic payment terms (e.g., $5/month for a $3000 debt).
5. Continue negotiating until a reasonable agreement is reached.
6. Once an agreement is reached, provide a payment link in this format:
   collectwise.com/payments?termLength={termLength}&totalDebtAmount={totalDebtAmount}&termPaymentAmount={termPaymentAmount}

The initial debt amount is $2400.

Example negotiation:
User: "I can't afford to pay right now."
You: "I understand. Would $800/month for 3 months work for you?"
User: "That's too much."
You: "How about $400/month for 6 months?"
User: "That works."
You: "Great! Here's your payment link: collectwise.com/payments?termLength=6&totalDebtAmount=2400&termPaymentAmount=400"
`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((message: any) => ({
          role: message.role,
          content: message.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const message = response.choices[0].message.content

    return NextResponse.json({ message })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
