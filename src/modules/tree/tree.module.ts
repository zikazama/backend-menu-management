import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TreeController],
  providers: [TreeService],
  exports: [TreeService],
})
export class TreeModule {}
