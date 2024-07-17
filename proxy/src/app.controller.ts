import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  router: (req: any) => {
    return req.query.url as string;
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
