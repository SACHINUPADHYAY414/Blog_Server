const pool = require('../database/Db');

const getAllNotes = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM notes');
        client.release();
        return result.rows;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

const getNoteById = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM notes WHERE note_id = $1', [id]);
        client.release();
        return result.rows[0];
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

const createNote = async ({ title, image, download_link, created_at }) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO notes (title, image, download_link, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, image, download_link, created_at]
        );
        client.release();
        return result.rows[0];
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

const updateNote = async (id, { title, image, download_link }) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE notes SET title = $1, image = $2, download_link = $3 WHERE note_id = $4 RETURNING *',
            [title, image, download_link, id]
        );
        client.release();
        return result.rows[0];
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

const deleteNote = async (id) => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM notes WHERE note_id = $1', [id]);
        client.release();
        return result.rowCount;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

const incrementDownloadCount = async (noteId) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'UPDATE notes SET download_count = download_count + 1 WHERE note_id = $1',
            [noteId]
        );
        client.release();
        return result.rowCount;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    incrementDownloadCount,
};
