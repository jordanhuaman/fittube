import mongodb, { MongoClient } from "mongodb"

const DBHOST = process.env.DBHOST || "mongodb://root:example@localhost:4000";
const DBNAME = process.env.DBNAME || "video-streaming";

const client = new MongoClient(DBHOST);
let database: mongodb.Db;
export const connecToDatabase = async () => {
  if (!database) {
    try {
      await client.connect();
      database = client.db(DBNAME);
    } catch (e) {
      console.error("❌ Error conectando a MongoDB:", e);
      process.exit(1); // Salir si falla la conexión
    }
  }
  return database;
}

export const getCollection = (collectionName: string) => {
  if (!database) {
    throw new Error("❌ La base de datos no está inicializada");
  }
  return database.collection(collectionName);
};
