const knex = require('knex');
const config = require('../knexfile');
const environment = process.env.ENVIRONMENT || "production"
const db = knex(config[environment]);

module.exports = {
    find,
    findById,
    findLyrics,
    add,
    update,
    remove
};

function find() {
    return db('lyrics');
}

function findById(id) {
    return db('lyrics')
        .where({ id })
        .first()
}

function findLyrics(id) {
    return db('lyrics')
        .where({ user_id: id })
        .orderBy('id')
}

function add(lyric) {
    return db('lyrics')
        .insert(lyric)
}

function update(changes, id) {
    return db('lyrics')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('lyrics')
        .where({ id })
        .del()
}