/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: UserRole;

  @Column({ default: false })
  isBanned: boolean;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @Column()
  createdAt: Date;

  @Column()
  lastLogin: Date;

  @Column()
  updatedAt: Date;
}
