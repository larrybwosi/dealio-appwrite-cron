import { generateAndSaveReceiptPdf } from "./tools/pdf";

const mockSaleData = {
  saleNumber: "TEST-12345",
  saleDate: new Date(),
  member: {
    user: {
      name: "Test Cashier"
    }
  },
  customer: {
    name: "Test Customer",
    email: "customer@test.com"
  },
  items: [
    {
      product: {
        name: "Test Product 1",
        sku: "TP001"
      },
      variant: {
        name: "Large",
        sku: "TP001-LG"
      },
      quantity: 2,
      unitPrice: 19.99,
      totalAmount: 39.98
    },
    {
      product: {
        name: "Test Product 2",
        sku: "TP002"
      },
      quantity: 1,
      unitPrice: 9.99,
      totalAmount: 9.99
    }
  ],
  totalAmount: 49.97,
  discountAmount: 10,
  taxAmount: 4.50,
  finalAmount: 54.47,
  paymentMethod: "Credit Card"
};

export default async ({ req, res, log }:any) => {
  const saleData = req.json();
  console.log("Received sale data:", saleData);
  const pdfBuffer = await generateAndSaveReceiptPdf(mockSaleData);
  return res.binary(pdfBuffer, 200, { 'Content-Type': 'application/pdf' });
};

// Uncomment the following lines to run the server
// import {Bun} from 'bun'
// const server = Bun.serve({
//   port: 3000,
//   routes: {
//     '/home': () => new Response('Hello World!'),
//     '/main.js': () => Bun.file('./src/main.js'),
//     '/pdf': async (req) => {
//       const pdfBuffer = await generateAndSaveReceiptPdf(mockSaleData);
//       console.log('PDF Buffer:', pdfBuffer);
//       return new Response(pdfBuffer);
//     },
//   },
// });



// console.log(`Listening on http://localhost:${server.port} ...`);