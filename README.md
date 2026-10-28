# How to Scrape Codeur.com: Freelance Projects and Leads in France (Budget, Category, Offers)

> **Run it now, no code: [codeur-projects-scraper on the Apify Store](https://apify.com/bibian/codeur-projects-scraper)** &nbsp;|&nbsp; $5.00 per 1,000 projects &nbsp;|&nbsp; no browser, no proxy

Codeur.com is France's leading freelance marketplace: clients post projects and freelancers send offers. This guide shows how to build a freelance projects scraper for Codeur.com and get freelance leads every day, with budget, category, wanted profiles, number of offers and the full brief, using a free Apify Actor from the console or from code.

Searches this page answers: freelance projects scraper, codeur.com scraper, freelance leads france, freelance job leads.

## What you get from the Codeur.com scraper

- Projects posted publicly by clients, newest first, filtered by keyword and publication date.
- Budget range, category, wanted freelance profiles, status, number of offers and number of views.
- Publication date in Paris time, and optionally the full brief written by the client.

Export the dataset as JSON, CSV or Excel, or read it through the Apify API. A real sample (five results, personal data removed, long texts truncated) is in [`sample-output.json`](sample-output.json).

## Output fields

| Field | What it is |
|---|---|
| `id`, `url` | Codeur project id and public link |
| `title` | Project title |
| `status` | For example `Ouvert` (open) |
| `budget` | Budget range as displayed, for example `500 € à 1 000 €` |
| `offersCount`, `viewsCount` | Number of offers received and number of views |
| `category` | Project category |
| `profilesWanted` | Array of freelance profiles the client is looking for |
| `publishedAt` | Publication date and time, Paris time |
| `description` | Client brief as plain text, only when the full brief is enabled |

## Use cases

- **Never miss a lead.** Schedule a daily run with "published within 1 day" and your keywords, and send new projects to Slack, e-mail or your CRM.
- **Size the demand.** Count which services French businesses ask for, and at which budgets.
- **Price your offer.** Compare budgets and the number of competing offers per type of project.
- **Spot trends.** Track the technologies and profiles that clients request more and more.

## Input

| Field | What it does |
|---|---|
| `keywords` | Words that must all appear in the title, category, wanted profiles or brief. Accents and case are ignored. |
| `publishedWithinDays` | Keep only recent projects. Use `1` for a daily alert. |
| `onlyOpen` | Skip closed projects. |
| `maxItems` | The run stops once this many projects are saved (default 50). |
| `includeDescription` | Adds the client's full brief. |

Example input:

```json
{
  "keywords": "wordpress",
  "publishedWithinDays": 1,
  "onlyOpen": true,
  "maxItems": 50,
  "includeDescription": true
}
```

## Four ways to use it

### 1. Apify console, no code

1. Open [the Actor page](https://apify.com/bibian/codeur-projects-scraper) and click **Try for free** (a free Apify account is enough).
2. Fill in the input form (keywords, filters and the maximum number of results) and click **Start**.
3. When the run finishes, open the **Output** tab, check the table, then **Export** as CSV, Excel or JSON.
4. For a daily alert, open **Schedules**, create a daily schedule for the Actor and, optionally, add an integration that sends new results to Slack, e-mail or Google Sheets.

### 2. Apify API with JavaScript

```bash
npm install apify-client
export APIFY_TOKEN="your token from Apify console, Settings, Integrations"
node examples/run.js
```

```js
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const run = await client.actor('bibian/codeur-projects-scraper').call({
    "keywords": "wordpress",
    "publishedWithinDays": 1,
    "onlyOpen": true,
    "maxItems": 50,
    "includeDescription": true
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
    console.log(`${item.title} | ${item.budget} | ${item.offersCount} offers | ${item.publishedAt}`);
}
```

The complete file is [`examples/run.js`](examples/run.js) (ES module, Node 18 or later).

### 3. Apify API with Python

```bash
pip install apify-client
export APIFY_TOKEN="your token from Apify console, Settings, Integrations"
python examples/run.py
```

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

run = client.actor("bibian/codeur-projects-scraper").call(run_input={
    "keywords": "wordpress",
    "publishedWithinDays": 1,
    "onlyOpen": True,
    "maxItems": 50,
    "includeDescription": True,
})

for item in client.dataset(run.default_dataset_id).iterate_items():
    print(f"{item['title']} | {item.get('budget')} | {item.get('offersCount')} offers | {item.get('publishedAt')}")
```

The complete file is [`examples/run.py`](examples/run.py). Never put your token in the code: read it from the `APIFY_TOKEN` environment variable as above.

### 4. REST API on RapidAPI, one key for all your APIs

If you already use RapidAPI, the same data is available as a plain REST API with monthly plans and a free tier: [codeur-freelance-projects-france on RapidAPI](https://rapidapi.com/VivienMORVAN/api/codeur-freelance-projects-france), also listed on [Zyla API Hub](https://zylalabs.com/api-marketplace/company+data/codeur+freelance+projects+france+api/14514). No Apify account needed, billing goes through your marketplace subscription.

```bash
curl -X POST "https://codeur-freelance-projects-france.p.rapidapi.com/v2/acts/bibian~codeur-projects-scraper/run-sync-get-dataset-items?clean=true" \
  -H "x-rapidapi-key: <YOUR_RAPIDAPI_KEY>" \
  -H "x-rapidapi-host: codeur-freelance-projects-france.p.rapidapi.com" \
  -H "content-type: application/json" \
  -d '{"keywords": "wordpress", "publishedWithinDays": 14, "onlyOpen": true, "maxItems": 20}'
```

The response is the JSON array of projects, with the same fields as above.

## Pricing

Pay per result: **$5.00 per 1,000 projects** (that is $0.005 per project), plus a tiny start fee of $0.00005 per run. You pay only for the results saved to the dataset. Apify's free plan includes monthly credits, enough to try it on a few hundred results. Prices are those shown on the [Store page](https://apify.com/bibian/codeur-projects-scraper) when this guide was written; the Store page is the reference.

## Limits and honest notes

- Only projects that Codeur.com shows publicly are collected; members-only projects are skipped.
- The client's identity is hidden by Codeur.com to visitors and is never collected.
- The budget is a range as displayed by the site, not a number.
- This is an unofficial tool, not affiliated with Codeur.com. Check the site terms and the data protection rules that apply to your use. Reaching out to clients is done on Codeur.com itself.

## FAQ

**How do I get a daily alert?**  
Schedule the Actor once a day with `publishedWithinDays` set to `1`, then connect the dataset to Slack, e-mail or Google Sheets with an Apify integration.

**Does it give me the client's contact details?**  
No. Codeur.com hides the client identity from visitors and the Actor never collects it.

**Can I keep only open projects?**  
Yes, set `onlyOpen` to true.

**Does it need a browser or a proxy?**  
No, runs are fast and cheap.

## Try it

**[Open codeur-projects-scraper on the Apify Store](https://apify.com/bibian/codeur-projects-scraper)**

The code in `examples/` is released under the MIT license (see [LICENSE](LICENSE)). The data belongs to its original publishers.
