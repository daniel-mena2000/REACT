// apiClient.ts
import { z } from "zod"

export async function fetchAndValidate<T>(
  url: string,
  schema: z.ZodSchema<T>
): Promise<T> {

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  const data = await response.json()

  const result = schema.safeParse(data)

  if (!result.success) {
   
    throw new Error("Invalid API response")
  }

  return result.data
}
