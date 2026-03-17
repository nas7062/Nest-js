import { BoardEntity } from "src/boards/boards.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(Type => BoardEntity, boards => boards.user, { eager: true })
  boards: BoardEntity[]
}