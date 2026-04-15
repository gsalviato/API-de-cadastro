import * as http from 'http';
import { DatabaseConnection } from './infrastructure/database';
import { CustomerRepository } from './infrastructure/CustomerRepository';
import { CustomerController } from './controllers/CustomerController';
import { HttpUtils } from './infrastructure/HttpUtils';

const PORT = 3000;

async function bootstrap() {
  const db = await DatabaseConnection.connect();
  const repository = new CustomerRepository(db);
  const controller = new CustomerController(repository);

  const server = http.createServer(async (req, res) => {
    try {
      await handleRoute(req, res, controller);
    } catch (error: any) {
      HttpUtils.sendError(res, 400, error.message);
    }
  });

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

async function handleRoute(req: http.IncomingMessage, res: http.ServerResponse, controller: CustomerController) {
  const { method, url } = req;
  const idMatch = url?.match(/^\/customers\/([a-zA-Z0-9-]+)$/);

  if (method === 'POST' && url === '/customers') {
    return await handleCreate(req, res, controller);
  }
  
  if (method === 'PUT' && idMatch) {
    return await handleUpdate(req, res, controller, idMatch[1]);
  }

  if (method === 'DELETE' && idMatch) {
    return await handleDelete(res, controller, idMatch[1]);
  }

  HttpUtils.sendError(res, 404, "Route not found");
}

async function handleCreate(req: http.IncomingMessage, res: http.ServerResponse, controller: CustomerController) {
  const body = await HttpUtils.parseBody(req);
  const result = await controller.create(body);
  HttpUtils.sendResponse(res, 201, result);
}

async function handleUpdate(req: http.IncomingMessage, res: http.ServerResponse, controller: CustomerController, id: string) {
  const body = await HttpUtils.parseBody(req);
  await controller.update(id, body);
  HttpUtils.sendResponse(res, 204, null);
}

async function handleDelete(res: http.ServerResponse, controller: CustomerController, id: string) {
  await controller.delete(id);
  HttpUtils.sendResponse(res, 204, null);
}

bootstrap().catch(console.error);
