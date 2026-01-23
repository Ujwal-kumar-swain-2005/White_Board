import React, { useState } from "react";
import styles from "../styles/FileUploader.module.scss";

type FileUploaderProps = {
  setShowFileUploader: React.Dispatch<React.SetStateAction<boolean>>;
  setTextReadFromFile: React.Dispatch<React.SetStateAction<string>>;
};

const FileUploader: React.FC<FileUploaderProps> = ({
  setShowFileUploader,
  setTextReadFromFile,
}) => {
  const [message, setMessage] = useState<string>(
    "Please upload a file!"
  );

  const showFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      !window.File ||
      !window.FileReader ||
      !window.FileList ||
      !window.Blob
    ) {
      setMessage(
        "There was an error uploading your file. Please try again!"
      );
      return;
    }

    const reader = new FileReader();
    const textFile = /text.*/;

    if (!file.type.match(textFile)) {
      setMessage("Only text files are allowed!");
      return;
    }

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setTextReadFromFile(result);
        setMessage("File uploaded successfully!");
        setShowFileUploader(false);
      }
    };

    reader.readAsText(file);
  };

  const closeFileUploader = () => {
    setShowFileUploader(false);
  };

  return (
    <div className={styles.fileUploader}>
      <input type="file" onChange={showFile} />
      <div id="show-text">{message}</div>
      <div
        className={styles.icon}
        onClick={closeFileUploader}
      >
        Cancel
      </div>
    </div>
  );
};

export default FileUploader;
