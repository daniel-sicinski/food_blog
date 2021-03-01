import { useState } from "react"

export const useSubscribe = (): [
  SubscribeFn,
  SubscriptionFeedbackMessage,
  boolean
] => {
  const [
    subscriptionFeedbackMessage,
    setSubscriptionFeedbackMessage,
  ] = useState<SubscriptionFeedbackMessage>(null)
  const [submittingFormState, setSubmittingFormState] = useState(false)

  const subscribe = async (email: string) => {
    const isValidEmail = /^[^@]+@[^@]+\.[^@]+$/.test(email)

    if (!isValidEmail) {
      setSubscriptionFeedbackMessage({
        message: "Please provide a valid email",
        type: "error",
      })
      return
    }

    setSubmittingFormState(true)

    try {
      await makeSubscribeRequest(email)
      setSubscriptionFeedbackMessage({
        message: "You've subscribed successfully!",
        type: "success",
      })
    } catch {
      setSubscriptionFeedbackMessage({
        message: "Something went wrong, try again later",
        type: "error",
      })
    } finally {
      setSubmittingFormState(false)

      setTimeout(() => {
        setSubscriptionFeedbackMessage(null)
      }, 5000)
    }
  }

  return [subscribe, subscriptionFeedbackMessage, submittingFormState]
}

const makeSubscribeRequest = async (email: string) => {
  fetch("https://email-service966.herokuapp.com/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailSubject: "New subscriber",
      emailText: `New subscriber: ${email}`,
    }),
  })
}

type SubscribeFn = (email: string) => Promise<void>
type SubscriptionFeedbackMessage = {
  message: string
  type: "error" | "success"
}