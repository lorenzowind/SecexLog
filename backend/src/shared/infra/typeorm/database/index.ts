import { createConnections } from 'typeorm';
import connectionOptions from './ormconfig';

createConnections(connectionOptions);
