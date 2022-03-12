import React, { useState, useEffect } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import pdffile from "./Cover-Letter-Mdwahids.pdf";
export const App = () => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(pdffile);
  const [pdfFileError, setPdfFileError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/studentPdfID?StudentId=25444")
      .then((res) => res.json())
      .then((data) => setPdfFile(data));
  });
  console.log(pdfFile);
  const studentPdf = pdfFile.PdfPath;
  console.log(studentPdf);

  const pdfpath = "http://localhost:5000/";
  const lastapth = pdfpath + studentPdf;
  console.log(lastapth);

  return (
    <div className="container">
      <br></br>

      <br></br>
      <h4>View PDF</h4>
      <div className="pdf-container">
        {/* show pdf conditionally (if we have one)  */}
        {pdfFile && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Viewer
                fileUrl={lastapth}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </>
        )}

        {/* if we dont have pdf or viewPdf state is null */}
        {!pdfFile && <>No pdf file selected</>}
      </div>
    </div>
  );
};

export default App;
