import { serve } from '@hono/node-server';
import donate from './donate/route';
import jupiterSwap from './jupiter-swap/route';
import heliusStake from './helius/stake/route';
import sanctumTrade from './sanctum/trade/route';
import tensorBuyFloor from './tensor/buy-floor/route';
import meteoraSwap from './meteora/swap/route';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';

const app = new OpenAPIHono();
app.use('/*', cors());

app.route('/api/helius/stake', heliusStake);

app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1',
  },
  openapi: '3.1.0',
});

app.get(
  '/swagger-ui',
  swaggerUI({
    url: '/doc',
  }),
);

const port = 3000;
console.log(
  `Server is running on port ${port}
Visit http://localhost:${port}/swagger-ui to explore existing actions
Visit https://actions.dialect.to to unfurl action into a Blink
`,
);

serve({
  fetch: app.fetch,
  port,
});
