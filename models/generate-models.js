const db = require('../db');

const generateModel = (table) => {
  return {
    selectAll: (...cols) => {
      if (cols.length === 1) cols = cols[0];
      return db.many('SELECT $(cols:name) FROM $(table:name);', { cols, table });
    },
    selectById: (params, ...cols) => {
      if (cols.length === 1) cols = cols[0];
      const id = params;
      const table_id = `${table}_id`;
      return db.one('SELECT $(cols:name) FROM $(table:name) WHERE $(table_id:name) = $(id);', {
        cols, table, table_id, id
      });
    },
    add: (body) => {
      return db.one('INSERT INTO $(table:name) ($(body:name)) VALUES ($(body:csv)) RETURNING*;', {
        table, body
      })
    },
    updateValue: (params, body) => {
      console.log(body)
      const id = params;
      const table_id = `${table}_id`;
      const values = Object.values(body)
      console.log(values)
      return values.map(value => {
        console.log(value)
        return db.one('UPDATE $(table:name) SET $(body:name) = $(value) WHERE $(table_id:name) = $(id) RETURNING*;', {
          table, body, value, table_id, id
        })
      })
        .catch(console.log)
    }


    // updateValue: (params, body) => {
    //   // return new Promise((resolve, reject) => {
    //   const keys = Object.keys(body)
    //   console.log(keys, 'keys')
    //   console.log(table)
    //   const cs = new pgp.helpers.ColumnSet(keys, { table: table })
    //   console.log(cs, 'cs')
    //   const query = pgp.helpers.update(body, cs);
    //   db.none(query)
    //     .then(() => {
    //       resolve()
    //     })
    //     .catch(console.log)
    //   // })
    // }


    // selectByParameter: (params, ...cols) => {
    //   if (cols.length === 1) cols = cols[0];
    //   const [[table_id, id]] = Object.entries(params);
    //   return db.many('SELECT $(cols:name) FROM $(table:name) WHERE $(table_id:name) = $(id);', {
    //     cols, table, table_id, id
    //   })
    //     .catch(console.log);

    // },
    // selectAndJoin: (params, join_table, join_table_id, ...cols) => {
    //   if (cols.length === 1) cols = cols[0];
    //   const join_1 = `${table}.${join_table_id}`;
    //   const join_2 = `${join_table}.${join_table_id}`;
    //   const [[table_id, id]] = Object.entries(params);
    //   return db.many('SELECT $(cols:name) FROM $(table:name) JOIN $(join_table:name) ON $(join_1:raw) = $(join_2:raw) WHERE $(table_id:name) = $(id);', {
    //     cols, table, join_table, join_1, join_2, table_id, id
    //   })
    // },
  }
}

module.exports = generateModel;