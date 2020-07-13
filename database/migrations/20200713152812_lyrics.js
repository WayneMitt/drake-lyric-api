
exports.up = function(knex) {
    return knex.schema.createTable('lyrics', lyrics => {
        lyrics.increments();
        lyrics.string('lyric').notNullable();
        lyrics.string('song').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('lyrics')
};
