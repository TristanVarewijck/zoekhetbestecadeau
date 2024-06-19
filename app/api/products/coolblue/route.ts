import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

const categoriesJson = {
  Date: [
    "aroma diffusers",
    "bodygrooms",
    "camcorders",
    "draagriemen",
    "epilatoren",
    "geurflacons",
    "haakse slijpers",
    "horlogebandjes",
    "juicers",
    "ladyshaves",
    "massagekussens",
    "multigrooms",
    "smartwatches",
    "stijltangen",
    "telefoonhouders",
  ],
  Verjaardag: [
    "3d printers",
    "action camera's",
    "audiorecorders",
    "bluetooth speakers",
    "compactcamera's",
    "game captures",
    "gaming headsets",
    "instant camera's",
    "kitchenaid mixers",
    "mp3 spelers",
    "smartwatches",
    "synthesizers",
    "tekentablets",
    "vr brillen",
    "wireless presenters",
  ],
  Bedankje: [
    "cadeaubonnen",
    "e-readers",
    "geurflacons",
    "koffiebonen",
    "koffiemolens",
    "powerbanks",
    "thee",
    "wafelijzers",
    "wijn",
  ],
  Vertrek: [
    "bagageweegschaal",
    "koffers",
    "mobiele opladers",
    "powerbanks",
    "reisgidsen",
    "reisportemonnees",
    "rugzakken",
  ],
  Housewarming: [
    "airco's",
    "barbecues",
    "blenders",
    "broodroosters",
    "combisets",
    "koffiezetapparaten",
    "magnetrons",
    "robotstofzuigers",
    "slowcookers",
    "smart home hubs",
    "stofzuigers",
    "vaatwassers",
    "waterkokers",
    "wijnklimaatkasten",
  ],
  Diploma: [
    "bluetooth speakers",
    "e-readers",
    "externe harde schijven hdd",
    "gaming headsets",
    "laptops",
    "powerbanks",
    "smartwatch",
    "tablet hoesjes",
    "tablets",
  ],
  Geboorte: [
    "babyfoons",
    "borstkolven",
    "draagzakken",
    "fleswarmers",
    "luiertassen",
    "luchtbevochtigers",
    "thermostaten",
    "wipstoeltjes",
  ],
  Pensioen: [
    "bloeddrukmeters",
    "elektrische kachels",
    "epilatoren",
    "gezichtsverzorging",
    "koffiemachines",
    "leesbrillen",
    "massagekussens",
    "pastamachines",
    "persoonsalarmering",
    "wijn",
  ],
  Jubileum: [
    "barbecues",
    "blenders",
    "koffiezetapparaten",
    "magnetrons",
    "slowcookers",
    "smart home hubs",
    "stofzuigers",
    "vaatwassers",
    "wijnklimaatkasten",
  ],
  Bruiloft: [
    "airco's",
    "barbecues",
    "broodroosters",
    "combisets",
    "koffiezetapparaten",
    "magnetrons",
    "robotstofzuigers",
    "slowcookers",
    "smart home hubs",
    "stofzuigers",
    "vaatwassers",
    "wijnklimaatkasten",
  ],
};

// this will be the techscraper API (coolblue/partnerize)

// feed ID
// campaign ID
// filters
export async function POST(request: NextRequest) {
  const { body } = request;

  try {
    const response = await axios.get(
      `https://api.partnerize.com/user/publisher/${process.env.PUBLISHER_ID}/feed`,
      {
        headers: {
          Authorization: `Basic ${process.env.PARTNERIZE_API_KEY}`,
          Cookie: `session=${process.env.PARTNERIZE_API_COOKIE}`,
        },
      }
    );

    const campaigns = response.data.campaigns;
    const { campaign } = campaigns.find(
      (campaign: any) =>
        campaign.campaign.campaign_id === process.env.COOLBLUE_CAMPAIGN_ID
    );

    const feed = campaign.feeds.find(
      (feed: any) =>
        feed.feed.campaign_feeds_id ===
        process.env.COOLBLUE_ALL_PRODUCTS_FEED_ID // feed_id
    );

    if (!feed) {
      return new NextResponse(JSON.stringify({ error: "Feed not found" }), {
        status: 404,
      });
    }

    const csvUrl = feed.feed.location;
    // Fetch the CSV data
    const csvResponse = await axios.get(csvUrl);
    const csvData = csvResponse.data;

    // Parse the CSV data
    const { data } = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
    });

    // get the unique product types (categories)
    const categories = Array.from(
      new Set(data.map((product: any) => product.product_type))
    );

    // log the categories in batches of 100
    for (let i = 0; i < categories.length; i += 100) {
      const batch = categories.slice(i, i + 100);
      console.log(batch);
    }

    // get the products that are between 0 and 150 euros
    const products = data.filter((product: any) => product.price <= 150);

    // return 100 random products
    const randomProducts = products
      .sort(() => 0.5 - Math.random())
      .slice(0, 100);

    return NextResponse.json(randomProducts);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: error.response?.status || 500,
    });
  }
}
