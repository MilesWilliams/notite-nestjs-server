import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { Note } from '../interfaces/note.interface';
import { Workspace } from 'src/workspace/interfaces/workspace.interface';

@Injectable()
export class NoteService {

    constructor(@InjectModel('Notes') private readonly notesModel: Model<Note>, @InjectModel('Workspaces') private readonly workspacesModel: Model<Workspace>) { }

    public async findAll(): Promise<HttpResponse<Note[]>> {
        const response: HttpResponse<Note[]> = {
            code: 201,
            message: 'Success',
            values: await this.notesModel.find()
        }

        return response;
    };

    public async find(id: string): Promise<HttpResponse<Note>> {

        const note = await this.notesModel.findOne({ _id: id });
        const response: HttpResponse<Note> = {
            code: 201,
            message: 'Success',
            values: note,
            query: { id: id },
        }

        return response;
    }

    public async create(note: Note, space_id: string): Promise<HttpResponse<Note>> {
        const newNote = new this.notesModel(note);

        const space = await this.workspacesModel.findOne({ _id: space_id });

        space.notes.push(newNote)
        await this.workspacesModel.findByIdAndUpdate(space_id, space)

        const response: HttpResponse<any> = {
            code: 201,
            message: 'Successfully created note',
            values: {
                note: newNote,
                workspace_id: space_id
            },
        }

        return response;
    }

    public async delete(id: string): Promise<HttpResponse<Note>> {
        const response: HttpResponse<Note> = {
            code: 201,
            message: 'Successfully deleted note',
            values: await this.notesModel.findByIdAndRemove(id),
            query: { id: id },
        }

        return response;
    }

    public async update(id: string, note: Note): Promise<HttpResponse<Note>> {
        const response: HttpResponse<Note> = {
            code: 201,
            message: 'Successfully updated note',
            values: await this.notesModel.findByIdAndUpdate(id, note, { new: true }),
            query: { id: id },
        }

        return response;
    }
}
