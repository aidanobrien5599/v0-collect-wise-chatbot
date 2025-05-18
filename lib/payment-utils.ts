import type { PaymentPlan } from "@/types"

export function calculatePaymentPlan(
  totalAmount: number,
  userProposal: number,
  frequency: "weekly" | "biweekly" | "monthly" = "monthly",
): PaymentPlan | null {
  // Minimum acceptable payment durations based on frequency
  const minDuration = {
    weekly: 4, // At least 4 weeks
    biweekly: 2, // At least 2 bi-weekly payments
    monthly: 1, // At least 1 month
  }

  // Maximum acceptable payment durations based on frequency
  const maxDuration = {
    weekly: 52, // Up to 1 year of weekly payments
    biweekly: 26, // Up to 1 year of bi-weekly payments
    monthly: 12, // Up to 1 year of monthly payments
  }

  // Calculate how many periods it would take to pay off the debt
  const periods = Math.ceil(totalAmount / userProposal)

  // Check if the proposal is reasonable
  if (periods >= minDuration[frequency] && periods <= maxDuration[frequency]) {
    // Calculate the actual payment amount (might be slightly higher to account for rounding)
    const actualPayment = Math.ceil(totalAmount / periods)

    return {
      termLength: periods,
      totalDebtAmount: totalAmount,
      termPaymentAmount: actualPayment,
      frequency,
    }
  }

  // If the proposal is not reasonable, return null
  return null
}

export function suggestAlternativePaymentPlan(
  totalAmount: number,
  userProposal: number,
  frequency: "weekly" | "biweekly" | "monthly" = "monthly",
): PaymentPlan {
  // Determine a reasonable number of periods based on the debt amount
  let suggestedPeriods: number

  if (frequency === "monthly") {
    // For monthly payments, suggest 3-12 months depending on amount
    suggestedPeriods = Math.min(Math.max(Math.ceil(totalAmount / 800), 3), 12)
  } else if (frequency === "biweekly") {
    // For bi-weekly payments, suggest 6-24 periods depending on amount
    suggestedPeriods = Math.min(Math.max(Math.ceil(totalAmount / 400), 6), 24)
  } else {
    // For weekly payments, suggest 12-52 periods depending on amount
    suggestedPeriods = Math.min(Math.max(Math.ceil(totalAmount / 200), 12), 52)
  }

  // Calculate the payment amount based on the suggested periods
  const suggestedPayment = Math.ceil(totalAmount / suggestedPeriods)

  return {
    termLength: suggestedPeriods,
    totalDebtAmount: totalAmount,
    termPaymentAmount: suggestedPayment,
    frequency,
  }
}

export function generatePaymentLink(plan: PaymentPlan): string {
  return `collectwise.com/payments?termLength=${plan.termLength}&totalDebtAmount=${plan.totalDebtAmount}&termPaymentAmount=${plan.termPaymentAmount}`
}
