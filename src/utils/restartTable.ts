import client from "../database";

export const restartTable = async (tableName: string) => {
    try {
        let sql = `DELETE FROM ${tableName} CASCADE`;
    
        const conn = await client?.connect();
        await conn?.query(sql);
    
        sql = `ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1`
        await conn?.query(sql)
    
        conn?.release();
      } catch(err) {
        throw new Error(`Couldn't restart table ${tableName}. Error: ${err}`);
      }
}