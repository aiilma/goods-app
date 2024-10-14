import { Injectable } from '@nestjs/common';
import { Good, PartialGood } from './goods.entity';
import { PartialLoadRequest, PartialLoadResponse } from './goods.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parseFilterValue } from './filter.util';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Good)
    private readonly goodsRepository: Repository<Good>
  ) {}

  async partialLoad(body: PartialLoadRequest = {
    page: 1,
    limit: 10,
    sort: { field: 'id', order: 'ASC' },
  }): Promise<PartialLoadResponse> {
    const query = this.goodsRepository.createQueryBuilder('goods');

    const page = body.page || 1;
    const limit = body.limit || 10;
    const skip = (page - 1) * limit;

    if (Array.isArray(body.filters)) {
      const conditions = body.filters.map((filter, index) => {
        const { operator } = parseFilterValue(filter.value);
        return `goods.${filter.field} ${operator} :value${index}`;
      });

      query.where(conditions.join(' AND '));
      body.filters.forEach((filter, index) => {
        const { value } = parseFilterValue(filter.value);
        query.setParameter(`value${index}`, value);
      });
    }

    if (body.sort && body.sort.field && body.sort.order) {
      query.orderBy(`goods.${body.sort.field}`, body.sort.order);
    }

    const [goods, total] = await query.skip(skip).take(limit).getManyAndCount();

    const minPrice = await this.goodsRepository.createQueryBuilder('goods')
      .select('MIN(goods.price)', 'minPrice')
      .getRawOne();

    const maxPrice = await this.goodsRepository.createQueryBuilder('goods')
      .select('MAX(goods.price)', 'maxPrice')
      .getRawOne();

    const availablePriceRange: PartialLoadResponse["availablePriceRange"] = [
      +minPrice.minPrice,
      +maxPrice.maxPrice,
    ];

    return { goods, total, availablePriceRange };
  }

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