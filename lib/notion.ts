// server only

import { Client } from '@notionhq/client';

const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

export async function fetchNotion(
  database_id: any,
  mapCb: (...params: any) => any,
  filter?: any
) {
  const pages = [];
  let cursor = undefined;

  while (true) {
    const { results, next_cursor }: any = await notionClient.databases.query({
      database_id,
      start_cursor: cursor,
      filter,
    });
    pages.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }

  return pages.map(mapCb);
}

export async function fetchFaq() {
  const faq = await fetchNotion('37c6683ee4664477990d9fcf720812d9', (page) => ({
    title: page.properties.title.title?.[0].plain_text,
    description: page.properties.description.rich_text?.[0].plain_text,
  }));
  return faq.reverse();
}

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function fetchSubscribers(filter?: any) {
  return await fetchNotion(
    DATABASE_ID,
    (page) => ({
      page_id: page.id,
      email: page.properties.email.title?.[0].plain_text,
      fname: page.properties.fname.rich_text?.[0].plain_text,
      lname: page.properties.lname.rich_text?.[0].plain_text,
      beta: page.properties.beta.checkbox,
    }),
    filter
  );
}

export default notionClient;
