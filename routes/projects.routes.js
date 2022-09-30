const router = require("express").Router();

router.post("/", (req, res) => {
  res.json({ id: "1" });
});

router.get("/", (req, res) => {
  res.json({ get: [] });
});

router.put("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
