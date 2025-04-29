import { generateAndSaveReceiptPdf } from "./tools/pdf";

export default async ({ req, res, log }:any) => {
  const saleData = await req.json();
  console.log("Received sale data:", saleData);
  const pdfBuffer = await generateAndSaveReceiptPdf(saleData);
  return res.binary(pdfBuffer, 200, { 'Content-Type': 'application/pdf' });
};

// Uncomment the following lines to run the server
// import {Bun} from 'bun'
const server = Bun.serve({
  port: 3000,
  routes: {
    '/home': () => new Response('Hello World!'),
    '/main.js': () => Bun.file('./src/main.js'),
    '/pdf': async (req: Request) => {
      console.log('Received request for PDF generation:', await req.json());
      // const pdfBuffer = await generateAndSaveReceiptPdf(mockSaleData);
      // console.log('PDF Buffer:', pdfBuffer);
      return new Response('pdfBuffer');
    },
  },
});



console.log(`Listening on http://localhost:${server.port} ...`);