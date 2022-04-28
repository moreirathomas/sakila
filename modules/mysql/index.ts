import mysql from "serverless-mysql";

export const connect = () => {
  return mysql({
    config: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT as string),
    },
  });
};
