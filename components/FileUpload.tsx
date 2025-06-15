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
  UploadResponse,
  Video
} from "@imagekit/next"
import { toast } from "sonner"
import { ClassNameValue } from "tailwind-merge"

import config from "@/lib/config"
import { authenticator } from "@/lib/imagekit"
import { cn } from "@/lib/utils"

type FileUploadProps = {
  type: "image" | "video"
  accept: string
  placeholder: string
  folder: string
  variant: "dark" | "light"
  value?: string
  onFileChange: (file?: UploadResponse["filePath"] | null) => void
}

const FileUpload = ({ type, accept, placeholder, folder, variant = "dark", value, onFileChange }: FileUploadProps) => {
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value || null
  })
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const styles: Record<string, ClassNameValue> = {
    button: variant === "dark" ? "bg-dark-300" : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400"
  }

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
        folder,
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        onProgress: ({ loaded, total }) => setProgress((loaded / total) * 100)

        // Progress callback to update upload progress state
        // onProgress: (event) => {
        //    setProgress((event.loaded / event.total) * 100)
        // },
        // Abort signal to allow cancellation of the upload if needed.
        // abortSignal: abortController.signal
      })
      setFile({ filePath: uploadResponse.filePath || null })
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
      <input type="file" ref={fileInputRef} accept={accept} className="hidden" onChange={handleUpload} />

      {file && (
        <>
          {type === "image" ? (
            <IKImage src={file.filePath ?? ""} height={300} width={500} alt="Uploaded file" />
          ) : (
            <Video src={file.filePath ?? ""} height={300} width={500} controls className="h-96 w-full rounded-xl" alt="Uploaded video" />
          )}
        </>
      )}

      <button type="button" className={cn("upload-btn", styles.button)} onClick={() => fileInputRef.current?.click()}>
        <Image src="/icons/upload.svg" width={20} height={20} className="object-contain" alt="upload icon" />

        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

        {progress > 0 && progress !== 100 && (
          <div className="w-full rounded-full bg-green-200">
            <div className="progress" style={{ width: `${progress}%` }}>
              <span className="text-xs text-green-800">{Math.round(progress)}%</span>
            </div>
          </div>
        )}
      </button>
    </ImageKitProvider>
  )
}

export default FileUpload
