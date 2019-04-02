import * as mongoose from 'mongoose';

export const NoteSchema = new mongoose.Schema({
    content: String,
    created_by: Number,
    created_date: String,
    icon: String,
    modified_by: Number,
    modified_date: String,
    title: String
});
