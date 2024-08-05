const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let filesData = {
  A: [],
  B: [],
  C: [],
  D: [],
};

function checkCompletion() {
  return (
    filesData.A.length &&
    filesData.B.length &&
    filesData.C.length &&
    filesData.D.length
  );
}

function saveNumber(number) {
  const result = number * 7;
  if (result > 140) {
    filesData.A.push(number);
    fs.writeFileSync("A.json", JSON.stringify(filesData.A));
  } else if (result > 100) {
    filesData.B.push(number);
    fs.writeFileSync("B.json", JSON.stringify(filesData.B));
  } else if (result > 60) {
    filesData.C.push(number);
    fs.writeFileSync("C.json", JSON.stringify(filesData.C));
  } else {
    filesData.D.push(number);
    fs.writeFileSync("D.json", JSON.stringify(filesData.D));
  }
}

app.post("/", (req, res) => {
  if (checkCompletion()) {
    return res.status(400).json({
      message: "process has been completed you can’t enter any new number",
      data: filesData,
    });
  }

  const { number } = req.body;
  if (number < 1 || number > 25) {
    return res.status(400).json({ message: "number should be from 1 to 25" });
  }

  saveNumber(number);
  res.status(200).json({ message: "Number saved successfully." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
