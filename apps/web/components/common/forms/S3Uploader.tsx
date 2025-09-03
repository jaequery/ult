"use client";

import { useTrpc } from "@web/contexts/TrpcContext";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Dialog } from "../../dashboard/Dialog";
import { CircularProgress } from "../preloaders/CircularProgress";

type S3UploaderProps = {
  onUpload?: (file: {
    name: string;
    url: string;
    extension: string;
    mimeType: string;
    size: number;
  }) => void;
  onComplete?: (file: any) => void;
  onClose: () => void;
};

export const S3Uploader = (props: S3UploaderProps) => {
  const { trpc } = useTrpc();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getPresignedUrl = trpc.uploadRouter.getPresignedUrl.useMutation();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Get presigned URL from backend
      const { uploadUrl, fileUrl } = await getPresignedUrl.mutateAsync({
        fileName: file.name,
        fileType: file.type,
      });

      // Upload file directly to S3
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200 || xhr.status === 204) {
          const fileData = {
            name: file.name,
            url: fileUrl,
            extension: file.name.split('.').pop() || '',
            mimeType: file.type,
            size: file.size,
          };
          
          if (props.onUpload) {
            props.onUpload(fileData);
          }
          if (props.onComplete) {
            props.onComplete(fileData);
          }
          
          toast.success("File uploaded successfully!");
          props.onClose();
        } else {
          toast.error("Upload failed");
        }
        setIsUploading(false);
      });

      xhr.addEventListener("error", () => {
        toast.error("Upload failed");
        setIsUploading(false);
      });

      // For S3, we need to use PUT without CORS preflight
      xhr.open("PUT", uploadUrl);
      if (file.type) {
        xhr.setRequestHeader("Content-Type", file.type);
      }
      xhr.send(file);

    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Upload failed");
      setIsUploading(false);
    }
  };

  return (
    <Dialog
      onClose={() => {
        if (!isUploading && props.onClose) {
          props.onClose();
        }
      }}
    >
      <div className="p-6 min-w-[400px]">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Upload File
        </h2>
        
        {!isUploading ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Select File
              </button>
              
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                or drag and drop your file here
              </p>
              
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Supported formats: Images, PDF, DOC, DOCX, TXT
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={props.onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-4">
              <CircularProgress />
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Uploading... {uploadProgress}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};