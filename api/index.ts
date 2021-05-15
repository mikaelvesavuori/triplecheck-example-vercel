import { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

import { TripleCheckBroker } from 'triplecheck-broker';
import { FaunaRepository } from 'triplecheck-repository-fauna';

dotenv.config();

/**
 * @description Vercel function handler.
 */
export default async (req: VercelRequest, res: VercelResponse) => {
  const [request, payload] = await getRequestData(req);

  const repository = FaunaRepository();
  const { responseData, status, headers } = await TripleCheckBroker(request, payload, repository);

  res.status(status).send(JSON.stringify(responseData));
};

/**
 * @description Utility function to get the data we need to run the TripleCheck broker. Expects the full Vercel request object.
 */
async function getRequestData(event: any): Promise<any> {
  const { body, method, url, query } = event;
  const payload = body && typeof body === 'string' ? JSON.parse(body) : body;
  /**
   * 1. Remove your initial Vercel function namespace, i.e. "api" or whatever you have
   * 2. Remove weird last equals sign
   * 3. Use only the first part (i.e, for example "/dependents") if we can
   */
  const _url = url.replace('/api', '').replace(/=/g, '').split('?')[0];

  const search = (() => {
    if (query && JSON.stringify(query) !== '{}') return Object.keys(query)[0];
    return null;
  })();

  return [
    {
      method,
      pathname: _url || '/',
      search
    },
    payload
  ];
}
