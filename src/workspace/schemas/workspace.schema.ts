import * as mongoose from 'mongoose';
import { NoteSchema } from 'src/notes/schemas/note.schema';

export const WorkspaceSchema = new mongoose.Schema({
    created_by: Number,
    created_date: String,
    description: String,
    modified_by:  Number,
    modified_date: String,
    name: String,
    notes: [NoteSchema]
});
