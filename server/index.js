const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const express = require("express");
const mammoth = require("mammoth");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/convertFile", upload.single("file"), async function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const docxPath = req.file.path;
    const content = await mammoth.extractRawText({ path: docxPath });

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { height } = page.getSize();

    page.drawText(content.value, {
      x: 50,
      y: height - 50,
      size: 12,
      color: rgb(0, 0, 0),
      maxWidth: 500,
    });

    const outputPath = path.join(
      __dirname,
      "files",
      `${req.file.originalname}.pdf`
    );
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    res.download(outputPath, () => {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete uploaded file:", err);
      });
      fs.unlink(outputPath, (err) => {
        if (err) console.error("Failed to delete output PDF:", err);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
