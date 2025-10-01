import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TreeService } from './tree.service';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';

@Controller('trees')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTreeDto: CreateTreeDto) {
    return this.treeService.create(createTreeDto);
  }

  @Get()
  findAll() {
    return this.treeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.treeService.findOne(id);
  }

  @Get('treeId/:treeId')
  findByTreeId(@Param('treeId') treeId: string) {
    return this.treeService.findByTreeId(treeId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTreeDto: UpdateTreeDto,
  ) {
    return this.treeService.update(id, updateTreeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.treeService.remove(id);
  }
}
