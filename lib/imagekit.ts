import { toast } from "sonner"

import config from "@/lib/config"

export const authenticator = async () => {
   try {
      const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

      if (!response.ok) {
         const errorText = await response.text()
         throw new Error(`Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      const { signature, expire, token, publicKey } = data

      return { signature, expire, token, publicKey }
   } catch (error: any) {
      toast.error("Authentication request failed: " + error.message)
      throw new Error(`Authentication request failed: ${error.message}`)
   }
}
