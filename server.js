const cors = require("cors");
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const SSLCommerzPayment = require("sslcommerz-lts");
require("dotenv").config();
// sslcommerz credantital
const store_id = `teams6623fcba51d0b`;
const store_passwd = `teams6623fcba51d0b@ssl`;
const is_live = false;

let apiUrl;
if (true) {
  apiUrl = process.env.PROURL;
} else {
  apiUrl = process.env.DEVURL;
}
console.log(apiUrl);

let serUrl;
if (true) {
  serUrl = process.env.PDURL;
} else {
  serUrl = process.env.SDURL;
}
console.log(serUrl);

// database connector
const MONGODB_CONNECTION =
  "mongodb+srv://soum-ik:frontenddev@cluster0.dunrodk.mongodb.net/?retryWrites=true&w=majority";
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
    await client.connect();
    console.log("database connected");
    const productCollection = client.db("ecomarce").collection("product");
    const orderCollection = client.db("ecomarce").collection("order");
    app.post("/payment", async (req, res) => {
      // get from the user request
      const reqBody = req.body;
      const {
        _productId,
        email,
        firstName,
        lastName,
        total,
        postCode,
        road,
        city,
        country,
        customersId,
        qnt,
      } = reqBody;
      console.log(reqBody, "reqbody json");
      // trans_id
      let trans_id = new ObjectId().toString();

      // get from the realtime database
      const _product = await productCollection.findOne({
        _id: new ObjectId(_productId),
      });
      const { price } = _product;

      const data = {
        total_amount: price,
        currency: "BDT",
        tran_id: trans_id, // use unique tran_id for each api call
        success_url: `${serUrl}/payment/success/${trans_id}`,
        fail_url: `${serUrl}/payment/fail/${trans_id}`,
        cancel_url: `${serUrl}/payment/cancel/${trans_id}`,
        ipn_url: `${serUrl}/payment/ipn`,
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: firstName,
        cus_email: email,
        cus_add1: road,
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: postCode,
        cus_country: country,
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

      try {
        const apiResponse = await sslcz.init(data);
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        const finalOrder = {
          _product,
          paidStatus: false,
          tranjection_id: trans_id,
          extraInformation: reqBody,
        };
        const result = await orderCollection.insertOne(finalOrder);
        res.send({ status: "success", url: GatewayPageURL, result: result });
      } catch (error) {
        // Handle errors here
        res
          .status(500)
          .send({ status: "error", message: "Internal server error" });
      }
    });

    app.post("/payment/success/:trans_id", async (req, res) => {
      const tran_id = req.params.trans_id;
      // Update the order with the matched transaction ID
      const updateProduct = await orderCollection.updateOne(
        { tranjection_id: tran_id }, // Filter for the specific order
        { $set: { paidStatus: true } } // Update to set paidStatus to true
      );
      if (updateProduct.modifiedCount > 0) {
        res.redirect(`${apiUrl}/payment/success?tran_id=${tran_id}`);
      } else {
        res.redirect(`${apiUrl}/payment/fail?tran_id=${tran_id}`);
      }
      console.log(
        req.params.trans_id,
        updateProduct,
        "this is from payment success"
      );
    });

    app.post("/payment/fail/:trans_id", async (req, res) => {
      const tran_id = req.params.trans_id;
      // Update the order with the matched transaction ID
      const updateProduct = await orderCollection.deleteOne(
        { tranjection_id: tran_id } // Filter for the specific order
      );
      res.redirect(`${apiUrl}/payment/fail?tran_id=${tran_id}`);

      console.log(
        req.params.trans_id,
        updateProduct,
        "this is from payment success"
      );
    });

    app.get("/order-details/:userId", async (req, res) => {
      const userId = req.params.userId;
      console.log(userId);
      const findOrder = await orderCollection
        .find({
          "_product.userId": new ObjectId(userId),
        })
        .toArray();
      console.log(findOrder, "find data");
      res.json({ data: "success", order: findOrder });
    });
  } catch (error) {
    console.log(error, "error");
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  console.log("Hello");
  res.send({ data: "hello" });
});

app.listen(port, () => {
  console.log("Listening to port:", port);
});
