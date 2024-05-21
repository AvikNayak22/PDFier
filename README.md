# PDFize

PDFize is a simple web application that allows users to convert Word documents (DOC/DOCX) to PDF format. The application consists of a frontend built with React and a backend using Express and Multer for file handling.

## Features

- **Upload Word Documents**: Users can upload DOC/DOCX files.
- **Convert to PDF**: Uploaded files are converted to PDF format.
- **Download Converted Files**: Users can download the converted PDF files directly from the web interface.

## Technologies Used

### Frontend

- React
- Tailwind CSS
- Axios
- Lucide React (for icons)

### Backend

- Express
- Multer (for file uploads)
- docx-pdf (for converting DOCX to PDF)
- Cors (for handling cross-origin requests)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository:**
   
   ```
    git clone https://github.com/AvikNayak22/PDFize.git
    cd PDFize
   ```
2. **Install frontend dependencies:**
   
   ```
   cd client
   npm install
   ```
4. **Install backend dependencies:**

   ```
   cd ../server
   npm install
   ```
5. **Start the server:**

   ```
   cd server
   node index.js
   ```
6. **Start the client:**

   ```
   cd ../client
   npm start
   ```

## Contributors
 - Avik Nayak (@AvikNayak22)
