'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProjectsSchema extends Schema {
  up() {
    this.create('projects', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('projects');
  }
}

module.exports = ProjectsSchema;
