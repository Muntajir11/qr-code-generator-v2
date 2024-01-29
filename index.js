
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

    const url= req.body.text;

    if (!url) {
      
      res.redirect("/");
    }
  

    QRCode.toFile('./public/QR Code Image/QR_Code.png', url, {

    }, function (err) {
      if (err) throw err
      console.log('QR Code is Generated')
    });

    console.log('URL is:',url);
    
    res.render('qrimage.ejs', {imageUrl});

});

app.listen(3000, () =>
  console.log('App listening on port 3000!'),
);
