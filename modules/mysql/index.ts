import mysql from "serverless-mysql";

// FIXME do not commit credentials!
// Although this password is shared between students,
// so I am not bothering with security concerns here.

export const connect = () => {
  return mysql({
    config: {
      host: "163.172.130.142",
      user: "etudiant",
      password: "CrERP29qwMNvcbnAMgLzW9CwuTC5eJHn",
      database: "sakila",
      port: 3310,
    },
  });
};
