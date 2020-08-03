'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Role extends Model {
  naver() {
    return this.hasMany('App/Models/Naver');
  }
}

module.exports = Role;
