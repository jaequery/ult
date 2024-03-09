import Uppy from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import { Dialog } from "./Dialog";

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
  const uppy = new Uppy({
    autoProceed: true,
    debug: true,
    ...props,
  })
    .use(Tus, {
      endpoint: "https://tusd.tusdemo.net/files/", // TODO: for prod, change this to your TUS server
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
      }
    })
    .on("complete", (e) => {
      console.info("completed");
      if (props.onComplete) {
        props.onComplete(e);
      }
    });
  return (
    <Dialog
      onClose={() => {
        if (props.onClose) {
          props.onClose();
        }
      }}
    >
      <div className="p-4">
        <Dashboard uppy={uppy} {...props} />
      </div>
    </Dialog>
  );
};
