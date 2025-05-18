export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface PaymentPlan {
  termLength: number
  totalDebtAmount: number
  termPaymentAmount: number
  frequency: "weekly" | "biweekly" | "monthly"
}
