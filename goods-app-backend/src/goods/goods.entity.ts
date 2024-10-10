import { Entity, Column, PrimaryGeneratedColumn, DeepPartial } from 'typeorm';

@Entity('goods')
export class Good {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountPrice: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  article: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string | null;
}

export type PartialGood = DeepPartial<Good>