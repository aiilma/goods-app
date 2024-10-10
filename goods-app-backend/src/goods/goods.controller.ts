import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { PartialGood } from './goods.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';

const STORAGE_PATH_WORD = 'storage';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('photo', {
    dest: `./${STORAGE_PATH_WORD}/`,
  }))
  async create(@Body() good: PartialGood, @UploadedFile() photo: Express.Multer.File) {
    const fileUrl = await this.handleFileUpload(photo);

    if (fileUrl) {
      good.photo = fileUrl;
    }

    return await this.goodsService.create(good);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    const good = await this.goodsService.findOne(id);
    return good;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('photo', {
    dest: `./${STORAGE_PATH_WORD}/`,
  }))
  async update(@Param('id') id: number, @Body() updateGood: PartialGood, @UploadedFile() photo: Express.Multer.File) {
    const fileUrl = await this.handleFileUpload(photo);

    if (fileUrl) {
      updateGood.photo = fileUrl;
    }

    return await this.goodsService.update(id, updateGood);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.goodsService.delete(id);
  }

  private async handleFileUpload(file: Express.Multer.File): Promise<string | null> {
    if (file) {
      const filePath = path.join(`./${STORAGE_PATH_WORD}/`, file.filename);
      const fileUrl = `/${STORAGE_PATH_WORD}/${file.filename}`;

      fs.renameSync(file.path, filePath);

      return fileUrl;
    } else {
      return null;
    }
  }
}