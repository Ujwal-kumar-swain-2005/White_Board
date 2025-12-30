import { useState } from "react";
import type { ChangeEvent } from "react";
import styles from "../style/FileUploader.module.scss";
type FileUploaderProps = {
  setShowFileUploader: (value: boolean) => void;
  setTextReadFromFile: (text: string) => void;
};

const FileUploader = ({
  setShowFileUploader,
  setTextReadFromFile,
}: FileUploaderProps) => {
  const [message, setMessage] = useState<string>(
    "Please upload a file!"
  );

  const showFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setMessage("No file selected!");
      return;
    }

    if (!file.type.startsWith("text")) {
      setMessage("Only text files are supported!");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      setTextReadFromFile(text);
      setMessage("File uploaded successfully!");
      setShowFileUploader(false);
    };

    reader.onerror = () => {
      setMessage("There was an error reading the file.");
    };

    reader.readAsText(file);
  };

  const closeFileUploader = () => {
    setShowFileUploader(false);
  };

  return (
    <div className={styles.fileUploader}>
      <input type="file" accept=".txt" onChange={showFile} />
      <div id="show-text">{message}</div>
      <div className={styles.icon} onClick={closeFileUploader}>
        Cancel
      </div>
    </div>
  );
};

export default FileUploader;
