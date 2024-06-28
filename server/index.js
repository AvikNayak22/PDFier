const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const PuppeteerHTMLPDF = require("puppeteer-html-pdf");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

const htmlPDF = new PuppeteerHTMLPDF();

app.use(cors());

//setting up the file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post(
  "/convertFile",
  upload.single("file"),
  async function (req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Read the DOCX file
      const docxPath = req.file.path;
      let content;
      try {
        content = await mammoth.convertToHtml({ path: docxPath });
      } catch (error) {
        console.error("Error converting DOCX to HTML:", error);
        return res.status(500).json({
          message: "Failed to convert DOCX to HTML",
        });
      }

      const file = { content: content.value };

      htmlPDF.setOptions({
        format: "A4",
        margin: {
          left: "25px",
          right: "25px",
          top: "20px",
        },
      });

      let pdfBuffer;
      try {
        pdfBuffer = await htmlPDF.create(file);
      } catch (error) {
        console.error("Error creating PDF:", error);
        return res.status(500).json({
          message: "Failed to create PDF",
        });
      }

      //defining output file path
      let outputPath = path.join(
        __dirname,
        "files",
        `${req.file.originalname}.pdf`
      );

      try {
        await htmlPDF.writeFile(pdfBuffer, outputPath);
      } catch (error) {
        console.error("Error writing PDF file:", error);
        return res.status(500).json({
          message: "Failed to write PDF file",
        });
      }

      res.download(outputPath, () => {
        console.log("File downloaded");

        // Clean up files after download
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Failed to delete uploaded file:", err);
        });
        fs.unlink(outputPath, (err) => {
          if (err) console.error("Failed to delete output PDF:", err);
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
