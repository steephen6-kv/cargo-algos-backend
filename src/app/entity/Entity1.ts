import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
  
@Entity()
export class Entity1 {

  @PrimaryGeneratedColumn("uuid")
  public id: string;
  
  @Column({ nullable: false })
  public name: string;
}
