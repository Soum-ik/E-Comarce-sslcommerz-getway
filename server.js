const cors = require("cors");
const express = require("express");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// database connector
const MONGODB_CONNECTION =
  "mongodb+srv://soum-ik:frontenddev@cluster0.dunrodk.mongodb.net/ecomarce?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(MONGODB_CONNECTION, {
  useNewUrlParser: true,
  serverApi: ServerApiVersion.v1,
});

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

async function run() {
  try {
    client.connect();
    // const productCollection = mongoose.connection.db.collection("product");
    // const orderCollection = mongoose.connection.db.collection("order");

    app.get("/get", async (req, res) => {
      const reqBody = await req.body;
      console.log(reqBody, "req body");
      res.send({ data: reqBody, status: "success" });
      // const { id } = reqBody;
      // const data = {
      //   total_amount: 100,
      //   currency: "BDT",
      //   tran_id: "REF123", // use unique tran_id for each api call
      //   success_url: "http://localhost:3030/success",
      //   fail_url: "http://localhost:3030/fail",
      //   cancel_url: "http://localhost:3030/cancel",
      //   ipn_url: "http://localhost:3030/ipn",
      //   shipping_method: "Courier",
      //   product_name: "Computer.",
      //   product_category: "Electronic",
      //   product_profile: "general",
      //   cus_name: "Customer Name",
      //   cus_email: "customer@example.com",
      //   cus_add1: "Dhaka",
      //   cus_add2: "Dhaka",
      //   cus_city: "Dhaka",
      //   cus_state: "Dhaka",
      //   cus_postcode: "1000",
      //   cus_country: "Bangladesh",
      //   cus_phone: "01711111111",
      //   cus_fax: "01711111111",
      //   ship_name: "Customer Name",
      //   ship_add1: "Dhaka",
      //   ship_add2: "Dhaka",
      //   ship_city: "Dhaka",
      //   ship_state: "Dhaka",
      //   ship_postcode: 1000,
      //   ship_country: "Bangladesh",
      // };
    });
  } catch (error) {
    console.log(error, "error");
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  console.log("Hello");
  res.send({data: "hello"});
});

app.listen(port, () => {
  console.log("Listening to port:", port);
});
