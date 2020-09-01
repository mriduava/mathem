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

//  create cart api
app.post('/createCart', (req, res) => {
  // Insert logic here
  return res.send('Cart created')
})

app.get("/calculatePrice", (req, res) => {
  // Insert logic here
  return res.send("Calculated price");
});

app.listen(PORT, () => console.log(`Server is listening at port ${PORT} from shopping`));
