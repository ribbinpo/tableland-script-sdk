import { Database } from "@tableland/sdk";
import { getSigner } from "../configs/signer.config";
import { chainConfig } from "../configs/chain.config";
import { saveTableName } from "../utils/tableUtil";

export const readAllQuery = async (db: Database, tableName: string) => {
  const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
  return results;
};

export const writeQuery = async (db: Database, tableName: string) => {
  const { meta: insert } = await db
    .prepare(`INSERT INTO ${tableName} (i,v) VALUES (?,?)`)
    .bind(0, "Hello")
    .run();
  await insert.txn!.wait();
};

export const createQuery = async (db: Database) => {
  const prefix = "test";

  const { meta: create } = await db
    .prepare(`CREATE TABLE ${prefix} (i integer primary key,v text)`)
    .run();

  const { name } = create.txn!;

  await saveTableName(chainConfig.mumbai.chainId.toString(), { test: name });

  return name;
};

export const run = async () => {
  // Setup connection to the database
  const signer = getSigner(chainConfig.mumbai.rpc);
  const db = new Database({ signer });

  console.log("start process:");
  const tableName = await createQuery(db);
  console.log("Table Name: ", tableName);
  await writeQuery(db, tableName);
  console.log("Write completed!!!");
  const results = await readAllQuery(db, tableName);
  console.log("result:");
  console.log(results);
};

export default run;
