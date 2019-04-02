import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace } from './interfaces/workspace.interface';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { Logger } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Note } from 'src/notes/interfaces/note.interface';

@Injectable()
export class WorkspaceService {

    constructor(@InjectModel('Workspaces') private readonly workspacesModel: Model<Workspace>) {}

    public async findAll(): Promise<HttpResponse<Workspace[]>> {
        const response: HttpResponse<Workspace[]> = {
            code: 201,
            message: 'Success',
            values: await this.workspacesModel.find().exec()
        }

        return response;
    };

    public async find(id: string): Promise<HttpResponse<Workspace>> {

        const space = await this.workspacesModel.findOne({ _id: id }).exec();
        const response: HttpResponse<Workspace> = {
            code: 201,
            message: 'Success',
            values: space,
            query: { id: id },
        }

        return response;
    }

    public async create(createWorkspaceDto: CreateWorkspaceDto): Promise<HttpResponse<Workspace>> {
        const newSpace = new this.workspacesModel(createWorkspaceDto);

        const response: HttpResponse<Workspace> = {
            code: 201,
            message: 'Successfully created workspace',
            values: await newSpace.save(),
        }

        return response;
    }

    public async delete(id: string): Promise<HttpResponse<Workspace>> {
        Logger.log('delete', id);
        const response: HttpResponse<Workspace> = {
            code: 201,
            message: 'Successfully deleted workspace',
            values: await this.workspacesModel.findByIdAndRemove(id).exec(),
            query: { id: id },
        }

        return response;
    }

    public async update(id: string, workspace: Workspace) {
        const response: HttpResponse<Workspace> = {
            code: 201,
            message: 'Successfully updated workspace',
            values: await this.workspacesModel.findByIdAndUpdate(id, workspace, { new: true }),
            query: { id: id },
        }

        return response;
    }

    public async search(query: string) {
        const regex = new RegExp(this.escapeRegex(query), 'gi');
        const response: HttpResponse<Workspace[]> = {
            code: 201,
            message: 'Successfully updated workspace',
            values: await this.workspacesModel.find({"name": regex}),
            query: { 
                query: query,
                parsed_query: regex
            }
        };

        return response;
    }

    private escapeRegex(text: string): string {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
}
