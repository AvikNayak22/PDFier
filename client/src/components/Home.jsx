import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

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
    <main className="container mx-auto p-6 md:p-12">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center h-[calc(100vh-177px)]">
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg border space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center">
            Word to PDF Converter
          </h1>
          <p className="text-center text-gray-600">
            Convert your Word documents to PDF format quickly and easily without
            any software installation.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="file"
              accept=".doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition duration-300 text-center"
            >
              {selectedFile ? selectedFile.name : "Select a Word File"}
            </label>
            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className={`flex-1 py-3 px-6 rounded-lg font-bold transition duration-300 ${
                selectedFile
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Convert Now
            </button>
          </div>
          {convert && (
            <div className="mt-4 text-center text-green-600 font-medium">
              {convert}
            </div>
          )}
          {downloadError && (
            <div className="mt-4 text-center text-red-600 font-medium">
              {downloadError}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
