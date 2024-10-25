"use client";

import Uppy from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/drag-drop/dist/style.css";
import { DashboardModal } from "@uppy/react";
import Transloadit from "@uppy/transloadit";
import { useState } from "react";
import { CircularProgress } from "../preloaders/CircularProgress";
import { Dialog } from "../../dashboard/Dialog";

type UploaderProps = {
  onUpload?: (file: {
    name: string;
    url: string;
    extension: string;
    mimeType: string;
    size: number;
  }) => void;
  onComplete?: (event: any) => void;
  onClose: () => void;
};
export const Uploader = (props: UploaderProps) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: true,
      debug: true,
      ...props,
    })
      // .use(Tus, {
      //   endpoint: "https://tusd.tusdemo.net/files/", // TODO: for prod, change this to your TUS server
      // })
      .use(Transloadit, {
        service: "https://api2.transloadit.com", // Transloadit API endpoint
        waitForEncoding: true,
        params: {
          auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_TOKEN || "" }, // Your Transloadit API key
          // secret: dc799eef3d60c83e9d399a6efdad3db1db1d8011
          template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID || "", // Optional: Use a predefined template
        },
      })
      .on("upload-success", (e: any) => {
        console.info("upload-success", e);
        if (props.onUpload && e.size) {
          const file = {
            name: e.name,
            url: e.tus.uploadUrl,
            extension: e.extension,
            mimeType: e.type,
            size: e.size,
          };
          props.onUpload(file);
          setIsUploaded(true);
        }
      })
      .on("complete", (e: any) => {
        const upload = e.transloadit?.[0]?.uploads?.[0];
        if (props.onComplete && upload) {
          const file = {
            name: upload.name,
            url: upload.ssl_url,
            extension: upload.ext,
            mimeType: upload.mime,
            size: upload.size,
          };
          props.onComplete(file);
        }
      })
  );
  return (
    <>
      {isUploaded ? (
        <Dialog
          onClose={() => {
            if (props.onClose) {
              props.onClose();
            }
          }}
        >
          <div className="flex justify-center items-center p-4 gap-4">
            <p>Processing file</p>
            <CircularProgress />
          </div>
        </Dialog>
      ) : (
        <DashboardModal open uppy={uppy} />
      )}
    </>
  );
};
