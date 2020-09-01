const db = "mathem";
const PORT = 3200;

/*To connect with MongoDB
 It will create a db named 'mathem'
*/
const { app } = require("mongoosy")({
  connect: {
    url: "mongodb://localhost/" + db,
  },
});

// Get products api
app.post("/getProductsByFilter", (req, res) => {
  // Insert logic here
  return res.send("Products fetched");
});

app.listen(PORT, () =>
  console.log(`Server is listening at port ${PORT} from shopping`)
);