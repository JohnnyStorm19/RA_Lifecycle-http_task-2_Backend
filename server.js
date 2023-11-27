import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

const notes = [];

app.get("/test", (req, res) => {
    res.send(`Hello from server on ${port} port!`);
  });

app.get("/notes", (req, res) => {
  res.send(JSON.stringify(notes));
});

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.json({success: true});
  res.end();
});

app.delete("/notes/:key", (req, res) => {
  const noteKey = req.params.key;
  const index = notes.findIndex((o) => o.key === noteKey);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  res.json({success: true, message: 'item has deleted'});
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));