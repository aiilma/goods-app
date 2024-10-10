import { Injectable } from '@nestjs/common';
import { Good, PartialGood } from './goods.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Good)
    private readonly goodsRepository: Repository<Good>
  ) {}

  async create(createGood: PartialGood): Promise<Good> {
    return await this.goodsRepository.save(createGood);
  }

  async findOne(id: number): Promise<Good> {
    const good = await this.goodsRepository.findOneBy({ id });
    return good
  }

  async update(id: number, updateGood: PartialGood): Promise<Good> {
    const good = await this.goodsRepository.findOneBy({ id });

    Object.assign(good, updateGood);
    return await this.goodsRepository.save(good);
  }

  async delete(id: number): Promise<any> {
    const good = await this.goodsRepository.findOneBy({ id });

    const result = await this.goodsRepository.delete(good.id);

    if (result.affected > 0) {
      return { id };
    } else {
      // fixme выбрасывать исключение
      return result;
    }
  }
}