import {Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Ride } from "./Ride";

@Entity()
export class Vehicle {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: true })
  public type: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ nullable: true })
  public registrationNumber: string;

  @CreateDateColumn({ type: "timestamp" })
  public createdDate?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedDate?: Date;

  @OneToMany(() => Ride, (ride) => ride.vehicle)
  public rides?: Ride[];

  @Column({nullable: true, type: "boolean", default: false})
  public isDeleted: boolean;

}
