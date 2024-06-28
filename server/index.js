const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const PuppeteerHTMLPDF = require("puppeteer-html-pdf");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

const htmlPDF = new PuppeteerHTMLPDF();
htmlPDF.setOptions({
  format: "A4",
  margin: {
    left: "25px",
    right: "25px",
    top: "20px",
  },
});

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
      const content = await mammoth.convertToHtml({ path: docxPath });

      const pdfBuffer = await htmlPDF.create(content.value);

      //defining output file path
      let outputPath = path.join(
        __dirname,
        "files",
        `${req.file.originalname}.pdf`
      );

      await htmlPDF.writeFile(pdfBuffer, outputPath);

      res.download(outputPath, () => {
        console.log("File downloaded");
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
