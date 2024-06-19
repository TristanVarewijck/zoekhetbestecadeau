// app/api/users/route.js

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import { productsFilter, productsParser } from "@/lib/utils";

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

    return NextResponse.json({ data: data });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: error.response?.status || 500,
    });
  }
}
