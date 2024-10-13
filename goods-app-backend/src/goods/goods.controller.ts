import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { Good, PartialGood } from './goods.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { PartialLoadRequest, PartialLoadResponse } from './goods.interface';

const PUBLIC_STORAGE = 'public/photos';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {
  }

  @Post()
  async getPartialList(@Body() body: PartialLoadRequest): Promise<PartialLoadResponse> {
    return await this.goodsService.partialLoad(body);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('photo', {
    dest: `./${PUBLIC_STORAGE}/`,
  }))
  async create(
    @Body('good') good: string,
    @UploadedFile() photo: Express.Multer.File
  ) {
    const parsedGood: PartialGood = JSON.parse(good)
    const fileUrl = await this.handleFileUpload(photo);

    if (fileUrl) {
      parsedGood.photo = fileUrl;
    }

    return await this.goodsService.create(parsedGood);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    const good = await this.goodsService.findOne(id);
    return good;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('photo', {
    dest: `./${PUBLIC_STORAGE}/`,
  }))
  async update(
    @Param('id') id: number,
    @Body('good') updateGood: string,
    @UploadedFile() photo: Express.Multer.File
  ) {
    const parsedGood: PartialGood = JSON.parse(updateGood)
    const fileUrl = await this.handleFileUpload(photo);

    if (fileUrl) {
      parsedGood.photo = fileUrl;
    }

    return await this.goodsService.update(id, parsedGood);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.goodsService.delete(id);
  }

  private async handleFileUpload(file: Express.Multer.File): Promise<string | null> {
    if (file) {
      const filePath = path.join(`./${PUBLIC_STORAGE}/`, file.filename);
      const fileUrl = `${file.filename}`;

      fs.renameSync(file.path, filePath);

      return fileUrl;
    } else {
      return null;
    }
  }
}