'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class NaversprojectsSchema extends Schema {
  up() {
    this.create('naversprojects', (table) => {
      table.increments('id').notNullable();
      table.integer('naver_id').references('id').inTable('navers').notNullable();
      table.integer('project_id').references('id').inTable('projects').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('naversprojects');
  }
}

module.exports = NaversprojectsSchema;
