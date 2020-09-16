const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

//student and cohort_id
pool.query(`
SELECT id, name, cohort_id
FROM students
LIMIT 5;
`)
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => console.error('query error', err.stack));

//student and cohort name
pool.query(`
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  LIMIT 5;
  `)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  });

//Query Parameters
pool.query(`
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE '%${process.argv[2]}%'
  LIMIT ${process.argv[3] || 5};
  `)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  }).catch(err => console.error('query error', err.stack));