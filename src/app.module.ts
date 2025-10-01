import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './modules/menu/menu.module';
import { TreeModule } from './modules/tree/tree.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MenuModule,
    TreeModule,
  ],
})
export class AppModule {}
