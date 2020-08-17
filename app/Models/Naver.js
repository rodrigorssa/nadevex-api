'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Database = use('Database');

class Naver extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }
  role() {
    return this.belongsTo('App/Models/Role', 'job_role', 'id');
  }
  projects() {
    return this.belongsToMany(
        'App/Models/Project',
        'naver_id',
        'project_id',
    ).pivotTable('naversprojects');
  }
  indexQueryBuilder(params, userId, naverId) {
    let q = `select n.id,n.name,n.birth_date,n.admission_date,r.role from navers as n inner join roles as r on n.job_role=r.id where n.user_id=${userId}`;
    q += naverId ? `and n.id=${naverId}` : '';
    const paramsProperties = Object.getOwnPropertyNames(params);
    paramsProperties.forEach((property) => {
      q += params[property] ? `and n.${property} ilike '%${params[property]}%'` : '';
    });

    return Database.raw(q).then((result) => result.rows);
  }

  getProjects(naverId) {
    const q = `select p.name,p.id from projects as p inner join naversprojects as np on np.project_id=p.id where np.naver_id=${naverId}`;

    return Database.raw(q).then((result) => result.rows || []).catch( (err) => []);
  }

  getNaversByProject(id) {
    const query = `select n.id,n.name,n.birth_date,n.admission_date, r.role as job_role from naversprojects as np join navers as n on np.naver_id=n.id join roles as r on n.job_role=r.id where np.project_id=${id}`;
    return Database.raw(query).then((result) =>result.rows || []).catch( () => []);
  }
}

module.exports = Naver;
