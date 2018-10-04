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
    addToLookUp: (params, body) => {
      const id = params.events_id;
      return db.many('INSERT INTO $(table:name) ($(body:name), $(params:name)) VALUES ($(body:csv), $(id)) RETURNING*;', {
        table, body, params, id
      })
    },
    updateValue: (params, body) => {
      const id = params;
      const table_id = `${table}_id`;
      return db.one('UPDATE $(table:name) \
                       SET ($(body:name)) = ($(body:csv)) \
                      WHERE $(table_id:name) = $(id) RETURNING*;', {
          table, body, table_id, id
        })
        .catch((err) => console.log)
    },
    selectByParameter: (params, ...cols) => {
      if (cols.length === 1) cols = cols[0];
      const id = params;
      const table_id = `events_id`;
      return db.many('SELECT $(cols:name) FROM $(table:name) WHERE $(table_id:name) = $(id);', {
        cols, table, table_id, id
      })
    },
    selectByDoubleParam: (param1, param2, ...cols) => {
      if (cols.length === 1) cols = cols[0];
      const id1 = param1;
      const id2 = param2;
      const table_id1 = `events_id`;
      const table_id2 = `stall_id`;
      return db.many('SELECT $(cols:name) FROM $(table:name) WHERE $(table_id1:name) = $(id1) AND $(table_id2:name) = $(id2);', {
        cols, table, table_id1, id1, table_id2, id2
      })
    },
    updateManyValues: (params, body) => {
      const id = params;
      const table_id = `event_stalls_id`;
      return db.one('UPDATE $(table:name) \
                       SET ($(body:name)) = ($(body:csv)) \
                      WHERE $(table_id:name) = $(id) RETURNING*;', {
          table, body, table_id, id
        })
        .catch((err) => console.log)
    }



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