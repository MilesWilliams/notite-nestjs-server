import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { WorkspaceSchema } from './schemas/workspace.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Workspaces', schema: WorkspaceSchema}])
    ],
    controllers: [WorkspaceController],
    providers: [WorkspaceService],
})
export class WorkspaceModule { }
