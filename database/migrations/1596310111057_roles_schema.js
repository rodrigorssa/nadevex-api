'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RolesSchema extends Schema {
  up() {
    this.create('roles', (table) => {
      table.increments('id').primary();
      table.string('role');
      table.timestamps();
    });
  }

  down() {
    this.drop('roles');
  }
}

module.exports = RolesSchema;
