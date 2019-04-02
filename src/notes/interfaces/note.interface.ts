import { Document } from 'mongoose';

export interface Note extends Document {
    id?: number;
    content: string;
    created_by: number;
    created_date: string;
    icon: string;
    modified_by: number;
    modified_date: string;
    title: string;
}