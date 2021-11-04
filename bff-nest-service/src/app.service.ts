import { Injectable } from '@nestjs/common';
import axios from 'axios';

let cache: { data?: Object, status?: number } | undefined;

@Injectable()
export class AppService {
  async getHello(req, res): Promise<void> {
    console.log('REQUEST URL:   ', req.originalUrl);
    console.log('REQUEST METHOD:   ', req.method);
    console.log('REQUEST BODY:   ', req.body);

    const service = req.originalUrl.split('/')[1];
    console.log('SERVICE is:   ', service);

    const serviceURL = process.env[service];
    console.log('SERVICE_URL is:   ', serviceURL);

    if (serviceURL) {
      const axiosConfig = {
        method: req.method,
        url: `${serviceURL}${req.originalUrl}`,
        ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
      };
      console.log('AXIOS_CONFIG is:   ', axiosConfig);

      try {
        if (req.method === 'GET' && !req.originalUrl.split('/')[2] && cache) {
          console.log('RESPONSE FROM CASHE');
          res.status(cache.status).json(cache.data);
        } else {
          const result = await axios(axiosConfig);
          console.log(`${service}-service RESPONSE is:   `, result.data);

          if (req.method === 'GET' && !req.originalUrl.split('/')[2]) {
            cache = {};
            cache.data = result.data;
            cache.status = result.status;
            setTimeout(() => cache = undefined, 120000);
          }

          res.status(result.status).json(result.data);
        }
      } catch (err) {
        console.log('Error is:   ', JSON.stringify(err));
        if (err.response) {
          const { status, data } = err.response;
          res.status(status).json(data);
        } else {
          res.status(500).json({ error: err.message });
        }
      }

    } else {
      res.status(502).json({ error: 'Cannot process request' });
    }

  }
}
