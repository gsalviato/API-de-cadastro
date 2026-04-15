import { IncomingMessage, ServerResponse } from 'http';

export class HttpUtils {
  public static async parseBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch (error) {
          reject(new Error("Invalid JSON"));
        }
      });
    });
  }

  public static sendResponse(res: ServerResponse, statusCode: number, data: any): void {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

  public static sendError(res: ServerResponse, statusCode: number, message: string): void {
    this.sendResponse(res, statusCode, { error: message });
  }
}