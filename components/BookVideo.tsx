import { ImageKitProvider, Video } from "@imagekit/next"

import config from "@/lib/config"

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
      <Video src={videoUrl} controls />
    </ImageKitProvider>
  )
}

export default BookVideo
