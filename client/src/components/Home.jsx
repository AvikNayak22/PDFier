import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { Upload } from "lucide-react";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setConvert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/convertFile",
        formData,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);
      saveAs(blob, selectedFile.name.replace(/\.[^/.]+$/, "") + ".pdf");

      setSelectedFile(null);
      setDownloadError("");
      setConvert("File converted Successfully");
    } catch (error) {
      if (error.response && error.response.status == 400) {
        setDownloadError("Error occurred ", error.response.data.message);
      } else {
        setConvert("");
      }
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
        <div className="flex h-[calc(100vh-88px)] items-center justify-center">
          <div className=" bg-gray-100 px-4 py-2 md:px-8 md:py-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center  mb-4">
              Convert Word to PDF Online
            </h1>
            <p className="text-sm text-center text-gray-400 mb-5">
              Easily convert Word documents to PDF format online, without having
              to install any software.
            </p>
            <div className="flex flex-col items-center gap-y-4">
              <input
                type="file"
                accept=".doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="FileInput"
              />
              <label
                htmlFor="FileInput"
                className="w-full flex gap-2 items-center justify-center px-6 py-4 bg-blue-800 text-white rounded-lg shadow-lg cursor-pointer border border-blue-800 hover:bg-blue-900 duration-300"
              >
                <Upload size={30} />
                <span className="text-xl sm:text-2xl mr-2">
                  {selectedFile ? selectedFile.name : "Upload File"}
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile}
                className="text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-6 py-3 rounded-lg mt-3"
              >
                Convert
              </button>
              {convert && (
                <div className="text-green-500 text-center mt-3">{convert}</div>
              )}
              {downloadError && (
                <div className="text-red-500 text-center mt-3">
                  {downloadError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
