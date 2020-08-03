'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class NaversSchema extends Schema {
  up() {
    this.create('navers', (table) => {
      table.increments('id').primary().notNullable();
      table.integer('user_id').references('id').inTable('users').notNullable();
      table.integer('job_role').references('id').inTable('roles').notNullable();
      table.string('name').notNullable();
      table.string('birth_date').notNullable();
      table.string('admission_date').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('navers');
  }
}

module.exports = NaversSchema;
