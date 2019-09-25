const express = require("express");
const path = require("path");
const PORT = 7000;
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "public", "index.html");
  res.sendFile(htmlPath);
});

app.listen(PORT, () => { 
    console.log(`Server started on port`, PORT); 
  });
