'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Project extends Model {
  navers() {
    return this.belongsToMany(
        'App/Models/Naver',
        'naver_id',
        'project_id',
    ).pivotTable('naversprojects');
  }
}

module.exports = Project;
