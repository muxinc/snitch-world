import type { NextApiRequest, NextApiResponse } from 'next';
import got from 'got';
import Meatascraper from 'metascraper';
import MetaTitle from 'metascraper-title';
import MetaDescription from 'metascraper-description';
import MetaImage from 'metascraper-image';
import MetaUrl from 'metascraper-url';

const Meta = Meatascraper([
  MetaUrl(),
  MetaTitle(),
  MetaDescription(),
  MetaImage()
]);

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  try {
    const { body: html, url } = await got(req.body);
    const metadata = await Meta({ html, url });

    console.log('metadata', metadata);
    
    res.status(200).json({ metadata });
  } catch(err) {
    res.status(400).json({ isException: true, message: `Unable to resolve: ${req.body}` });
  }
}
