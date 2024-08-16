import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  router: (req: any) => {
    return req.query.url as string;
  },
  on: {
    proxyReq: (proxyReq, req: any) => {
      const url = new URL(req.query.url as string);
      Object.keys(req.headers).forEach((key) => {
        proxyReq.setHeader(key, req.headers[key]);
      });
      proxyReq.setHeader('host', url.host);
      proxyReq.setHeader('origin', url.origin);
    },
    proxyRes: (proxyRes, req: any, res: any) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin;
    },
  },
  ignorePath: true,
  changeOrigin: true,
});

@Controller()
export class AppController {
  @All()
  get(@Req() req, @Res() res, @Next() next) {
    proxy(req, res, next);
  }
}
