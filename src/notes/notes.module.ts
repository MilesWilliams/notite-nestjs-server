import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './schemas/note.schema';
import { NotesController } from './notes.controller';
import { NoteService } from './services/note.service';
import { WorkspaceModule } from 'src/workspace/workspace.module';

@Module({
    imports: [
        WorkspaceModule,
        MongooseModule.forFeature([{name: 'Notes', schema: NoteSchema}])
    ],
    controllers: [NotesController],
    providers: [NoteService],
})
export class NotesModule { }
