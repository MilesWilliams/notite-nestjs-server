import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspaceService } from './workspace.service';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { Workspace } from './interfaces/workspace.interface';

@Controller('workspace')
export class WorkspaceController {

    constructor(private readonly _svc: WorkspaceService){}

    @Get()
    Workspaces(): Promise<HttpResponse<Workspace[]>> {
        return this._svc.findAll();
    }

    @Get(':id')
    FindWorkspace( @Param('id') id: string ): Promise<HttpResponse<Workspace>> {
        return this._svc.find(id);
    }

    @Post()
    Create(@Body() createWorkspaceDto: CreateWorkspaceDto): Promise<HttpResponse<Workspace>> {
        return this._svc.create(createWorkspaceDto as Workspace);
    }

    @Delete(':id')
    Delete(@Param('id') id: string) {
        return this._svc.delete(id);
    }

    @Put(':id')
    Update(@Body() createWorkspaceDto: CreateWorkspaceDto, @Param('id') id: string): Promise<HttpResponse<Workspace>> {
        return this._svc.update(id, createWorkspaceDto as Workspace);
    }

    @Get('search/:query')
    Search(@Param('query') query: string): Promise<HttpResponse<Workspace[]>> {
        return this._svc.search(query);
    }

}
