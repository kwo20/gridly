import Dexie from 'dexie';

const db = new Dexie('ImageDB');
db.version(1).stores({ images: '++id' });

export default db;
