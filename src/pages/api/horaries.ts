import { NextApiRequest, NextApiResponse } from 'next';

import { getHoraries } from '@lib/ads';

export default function horaries(req: NextApiRequest, res: NextApiResponse) {
  const horaryType = req.query.type;

  if (horaryType !== 'all' && horaryType !== 'today')
    return res.status(404).json({ error: 'É aceito apenas TYPE igual a `all` e `today`' });

  const data = getHoraries(horaryType);

  res.json(data);
}