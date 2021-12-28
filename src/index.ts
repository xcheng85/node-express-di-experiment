
import * as http from 'http';
import { AddressInfo } from 'net';
import server from './server';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;
const server1 = http.createServer(server.instance);

function serverError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
      throw error;
  }
  // handle specific error codes here.
  throw error;
}

function serverListening(): void {
  const addressInfo: AddressInfo = <AddressInfo>server1.address();
  logger.info(`Listening on ${addressInfo.address}:${PORT}`);
}

server1.on('error', serverError);
server1.on('listening', serverListening);

server1.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});

process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection: reason:', reason.message);
  logger.error(reason.stack);
  // application specific logging, throwing an error, or other logic here
});