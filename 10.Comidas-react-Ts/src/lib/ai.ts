//Esta importacion es donde simplifica mucho del codigo - npm install @openrouter/ai-sdk-provider esto se encuentra es: Vercel AI SDK
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openrouter = createOpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_KEY
})
