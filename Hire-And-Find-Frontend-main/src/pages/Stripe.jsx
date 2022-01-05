// import React, { useState, useEffect } from "react";

// import StripeCheckout from "react-stripe-checkout";
// import axios from "axios";

// const Stripe = (props) => {
//   const { price } = props;
//   const { from } = props.location.state;
//   console.log("from", from);
//   const priceForStripe = Math.round(price * 74.35);

//   const published_key =
//     "pk_test_51J33DXAS6wWQYlKwJGLdbC0nYHBOorKvLDxp1pkSU6Ikk7EwiMQcNiyJ2qqBsoL4FLDbsrBfk4Jj8OuR6X78X6qn00pVi1l00l";

//   const onToken = (token) => {
//     axios({
//       url: "/stripepayment",
//       method: "POST",
//       data: {
//         amount: priceForStripe,
//         price: price,
//         token,
//       },
//     })
//       .then((res) => alert("Payment is successful"))
//       .catch((err) => {
//         alert("There was an issue with your payment");
//       });
//   };

//   return (
//     <div>
//       <StripeCheckout
//         // className="storebtn"
//         name="H&F"
//         image="https://stripe.com/img/documentation/checkout/marketplace.png"
//         description={`Total price is $${price}`}
//         label="Pay Now"
//         panelLabel="Pay Now"
//         amount={priceForStripe}
//         // currency="INR"
//         stripeKey={published_key}
//         shippingAddress={false}
//         billingAddress={false}
//         token={onToken}
//       />
//     </div>
//   );
// };

// export default Stripe;
