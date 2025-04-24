import { useRef, useState } from "react"
import Image from "next/image"
import {
   Image as IKImage,
   ImageKitAbortError,
   ImageKitInvalidRequestError,
   ImageKitProvider,
   ImageKitServerError,
   ImageKitUploadNetworkError,
   upload,
   UploadResponse
} from "@imagekit/next"
import { toast } from "sonner"

import config from "@/lib/config"
import { authenticator } from "@/lib/imagekit"

const ImageUpload = ({ onFileChange }: { onFileChange: (file?: UploadResponse["filePath"] | null) => void }) => {
   const [file, setFile] = useState<UploadResponse | null>(null)
   const fileInputRef = useRef<HTMLInputElement>(null)

   const handleUpload = async () => {
      const fileInput = fileInputRef.current

      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
         toast.error("Please select a file to upload")
         return
      }

      const file = fileInput.files[0]

      const authParams = await authenticator()

      const { signature, expire, token, publicKey } = authParams

      try {
         const uploadResponse = await upload({
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: file.name // Optionally set a custom file name
            // Progress callback to update upload progress state
            // onProgress: (event) => {
            //    setProgress((event.loaded / event.total) * 100)
            // },
            // Abort signal to allow cancellation of the upload if needed.
            // abortSignal: abortController.signal
         })
         setFile(uploadResponse)
         onFileChange(uploadResponse.filePath)
         toast.success("File uploaded successfully: " + uploadResponse.filePath)
      } catch (error) {
         if (error instanceof ImageKitAbortError) {
            toast.error("Upload aborted: " + error.reason)
         } else if (error instanceof ImageKitInvalidRequestError) {
            toast.error("Invalid request: " + error.message)
         } else if (error instanceof ImageKitUploadNetworkError) {
            toast.error("Network error: " + error.message)
         } else if (error instanceof ImageKitServerError) {
            toast.error("Server error: " + error.message)
         } else if (error instanceof Error) {
            toast.error("Upload error: " + error.message)
         } else {
            toast.error("Upload error: " + error)
         }
      }
   }

   return (
      <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
         <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleUpload} />

         {file && <IKImage src={file.filePath ?? ""} height={300} width={500} alt="Uploaded file" />}

         <button type="button" className="upload-btn bg-dark-300" onClick={() => fileInputRef.current?.click()}>
            <Image src="/icons/upload.svg" width={20} height={20} className="object-contain" alt="upload icon" />

            <p className="text-base text-light-100">Upload a file</p>

            {file && <p className="upload-filename truncate">{file.filePath}</p>}
         </button>
      </ImageKitProvider>
   )
}

export default ImageUpload
