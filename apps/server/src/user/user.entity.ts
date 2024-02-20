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
  @PrimaryGeneratedColumn()
  public id: number;

  @Index({ unique: true })
  @Column('citext', { nullable: false })
  public email: string;

  @Column('text', { nullable: true, select: false })
  public password: string;

  @Column('text', { nullable: true })
  public firstName: string;

  @Column('text', { nullable: true })
  public lastName: string;

  @Column('text', { nullable: true })
  public street1: string;

  @Column('text', { nullable: true })
  public street2: string;

  @Column('text', { nullable: true })
  public city: string;

  @Column('text', { nullable: true })
  public state: string;

  @Column('text', { nullable: true })
  public postalCode: string;

  @Column('text', { nullable: true })
  public countryCode: string;

  @Column('timestamp', { nullable: true })
  public verified: Date;

  @Column('timestamp', { nullable: true })
  public visited: Date;

  @Column('timestamp', { nullable: true })
  public authenticated?: Date;

  @DeleteDateColumn()
  public deleted?: Date;

  @UpdateDateColumn()
  public updated?: Date;

  @CreateDateColumn()
  public created: Date;
}
