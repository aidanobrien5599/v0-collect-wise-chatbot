import { Chat } from "@/components/chat"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">CollectWise Payment Assistant</h1>
        <Chat />
      </div>
    </main>
  )
}
