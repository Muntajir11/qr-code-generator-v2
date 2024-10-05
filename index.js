
import express from "express";
import bodyParser from "body-parser";
import QRCode from 'qrcode';


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const imageUrl= '../QR Code Image/QR_Code.png';
const imagePath = 'styles/qr.png';

app.get("/", (req, res) => {
  res.render("index.ejs",{imagePath}); 
});


app.post("/submit", (req, res) => {
  const url = req.body.text;

  if (!url) {
      res.redirect("/");
      return; // Add a return to prevent further execution
  }

  // Generate the QR code and save it to the public folder
  QRCode.toFile('./public/QR Code Image/QR_Code.png', url, {}, function (err) {
      if (err) throw err;
      console.log('QR Code is Generated');

      // Update the imageUrl to point to the saved QR code
      const imageUrl = '/QR Code Image/QR_Code.png'; // Change this line

      // Render the QR code image page
      res.render('qrimage.ejs', { imageUrl });
  });

  console.log('URL is:', url);
});


app.listen(3000, () =>
  console.log('App listening on port 3000!'),
);
