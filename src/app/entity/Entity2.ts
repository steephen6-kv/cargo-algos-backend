import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
  
@Entity()
export class Entity2 {

  @PrimaryGeneratedColumn("uuid")
  public id: string;
  
  @Column({ nullable: false })
  public name: string;
}
