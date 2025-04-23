import { getUploadAuthParams } from "@imagekit/next/server"

import config from "@/lib/config"

const { publicKey, privateKey } = config.env.imagekit

export async function GET() {
   const { token, expire, signature } = getUploadAuthParams({
      privateKey, // Use the privateKey from config
      publicKey // Use the publicKey from config
      // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
      // token: "random-token", // Optional, a unique token for request
   })

   return Response.json({ token, expire, signature, publicKey })
}
