// sk_test_51NuMomEkSwAVwyolKawuX9hQ9U0Uzp2dMImjTiMZzs5Z6V2F2zersSp7B8EMATJIYfFicqn25M5n2qTeGSoUCWKZ00ywOxjq0F
// 60 donation product key price_1NvRPvEkSwAVwyol4daWiYZ4
// 30 donation product key price_1NvROvEkSwAVwyolL8AZYT4V
// 20 donation product key price_1NvRNpEkSwAVwyol83js5tiq
// 10 donation product key price_1NvRLqEkSwAVwyolh2Jdmnqb
// custom donation product key price_1NvRJCEkSwAVwyol9ThQzuHUcd

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51NuMomEkSwAVwyolKawuX9hQ9U0Uzp2dMImjTiMZzs5Z6V2F2zersSp7B8EMATJIYfFicqn25M5n2qTeGSoUCWKZ00ywOxjq0F');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
 console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: 1
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "https://super-waffle-6j6p6j47xxrh4jq6-3000.app.github.dev/thankyou",
        cancel_url: "https://super-waffle-6j6p6j47xxrh4jq6-3000.app.github.dev/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));
