'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Naver extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }
  role() {
    return this.belongsTo('App/Models/Role', 'job_role', 'id');
  }
  projects() {
    return this.belongsToMany('App/Models/Project', 'naver_id', 'project_id').pivotTable('naversprojects');
  }
}

module.exports = Naver;
