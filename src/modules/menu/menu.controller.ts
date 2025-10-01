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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CreateMenuTreeDto } from './dto/create-menu-tree.dto';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Post('tree')
  @HttpCode(HttpStatus.CREATED)
  createTree(@Body() createMenuTreeDto: CreateMenuTreeDto) {
    return this.menuService.createTree(createMenuTreeDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get('trees')
  getAllTrees() {
    return this.menuService.getAllTrees();
  }

  @Get('tree/:treeId')
  getMenuTreeById(@Param('treeId') treeId: string) {
    return this.menuService.getMenuTree(treeId);
  }

  @Get('tree')
  getMenuTree() {
    return this.menuService.getMenuTree();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  @Get('uuid/:uuid')
  findByUuid(@Param('uuid') uuid: string) {
    return this.menuService.findByUuid(uuid);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(id);
  }
}
