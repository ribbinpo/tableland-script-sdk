import * as fs from "fs";

const getTableNamePath = (networkName: string) =>
  `${__dirname}/../tableList/${networkName}.json`;

export const saveTableName = async (
  networkName: string,
  tableName: Record<string, string>
) => {
  const tableNamePath = getTableNamePath(networkName);

  const pathArr = tableNamePath.split("/");
  const dirPath = [...pathArr].slice(0, pathArr.length - 1).join("/");

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

  return fs.writeFileSync(tableNamePath, JSON.stringify({ ...tableName }));
};

export default { saveTableName };
