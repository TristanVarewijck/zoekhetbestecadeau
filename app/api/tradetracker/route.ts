// import { NextRequest, NextResponse } from "next/server";
// import { createClientAsync } from "soap";

// export async function GET(req: NextRequest) {
//   const url = "http://ws.tradetracker.com/soap/affiliate?wsdl";
//   const customerID = 279573;
//   const passphrase = "9c15b6ff093a40a4b3bd552d13f44450e8b03c44";
//   const sandbox = false;
//   const locale = "en_GB";
//   const demo = false;

//   try {
//     // Create SOAP client
//     const client = await createClientAsync(url, {
//       wsdl_options: {
//         // Enable gzip compression
//         compressed: true,
//       },
//     });

//     // Authenticate
//     const authResult = await client.authenticateAsync({
//       customerID,
//       passphrase,
//       // sandbox,
//       // locale,
//       // demo,
//     });
//     console.log("Authentication result:", authResult);

//     // Check if authentication was successful
//     if (authResult && authResult[0] === null) {
//       console.log("Authentication successful");

//       // console.log(client.getAffiliateSites());
//       // Get Affiliate Sites
//       const affiliateSitesResult = await client.getAffiliateSitesAsync({});
//       console.log("Affiliate sites result:", affiliateSitesResult);

//       // Extract affiliate sites from the result
//       const affiliateSites = affiliateSitesResult[0].item; // Adjust based on actual response structure

//       // Transform the result into desired format
//       const sites = affiliateSites.map((site: any) => ({
//         name: site.name,
//         URL: site.URL,
//       }));

//       return NextResponse.json({
//         success: true,
//         affiliateSites: sites,
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "Authentication failed",
//         authResult,
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({
//       success: false,
//       // error: error.message,
//     });
//   }
// }
