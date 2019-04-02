import { Document } from 'mongoose';
import { Note } from "src/notes/interfaces/note.interface";

export interface Workspace extends Document {
    id?: number;
    created_by: number;
    created_date: string;
    description: string;
    modified_by:  number;
    modified_date: string;
    name: string;
    notes?: Note[]
}