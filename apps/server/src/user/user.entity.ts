import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty()
  @Index({ unique: true })
  @Column('citext', { nullable: false })
  public email: string;

  @ApiProperty()
  @Column('text', { nullable: true, select: false })
  public password: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  public firstName: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  public lastName: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  public street1: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  public street2: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  public city: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  public state: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  public postalCode: string;

  @ApiPropertyOptional()
  @Column('text', { nullable: true })
  public countryCode: string;

  @ApiPropertyOptional()
  @Column('timestamp', { nullable: true })
  public verified: Date;

  @ApiPropertyOptional()
  @Column('timestamp', { nullable: true })
  public visited: Date;

  @ApiPropertyOptional()
  @Column('timestamp', { nullable: true })
  public authenticated?: Date;

  @DeleteDateColumn()
  public deleted?: Date;

  @UpdateDateColumn()
  public updated?: Date;

  @ApiProperty()
  @CreateDateColumn()
  public created: Date;
}
