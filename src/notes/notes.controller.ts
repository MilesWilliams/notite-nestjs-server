import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { NoteService } from './services/note.service';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './interfaces/note.interface';


@Controller('notes')
export class NotesController {

    constructor(private readonly _svc: NoteService) {}

    @Get()
    Notes(): Promise<HttpResponse<Note[]>> {
        return this._svc.findAll();
    }

    @Get(':id')
    FindNote( @Param('id') id: string ): Promise<HttpResponse<Note>> {
        return this._svc.find(id);
    }

    @Post(':id')
    Create(@Body() createNoteeDto: CreateNoteDto, @Param('id') space_id: string ): Promise<HttpResponse<Note>> {
        return this._svc.create(createNoteeDto as Note, space_id);
    }

    @Delete(':id')
    Delete(@Param('id') id: string) {
        return this._svc.delete(id);
    }

    @Put(':id')
    Update(@Body() createNoteeDto: CreateNoteDto, @Param('id') id: string): Promise<HttpResponse<Note>> {
        return this._svc.update(id, createNoteeDto as Note);
    }
}
