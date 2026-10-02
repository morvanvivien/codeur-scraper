// Minimal example: run the codeur-projects-scraper Actor and print the results.
// Usage: APIFY_TOKEN=... node run.js   (Node 18 or later, npm install apify-client)
import { ApifyClient } from 'apify-client';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

const client = new ApifyClient({ token });

const input = {
    "keywords": "wordpress",
    "publishedWithinDays": 1,
    "onlyOpen": true,
    "maxItems": 50,
    "includeDescription": true
};

const run = await client.actor('bibian/codeur-projects-scraper').call(input);
const { items } = await client.dataset(run.defaultDatasetId).listItems();

console.log(`${items.length} results`);
for (const item of items) {
    console.log(`${item.title} | ${item.budget} | ${item.offersCount} offers | ${item.publishedAt}`);
}
