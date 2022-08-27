import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Ride } from "./Ride";
import { User } from "./user";

@Entity()
export class Vehicle {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: true })
  public type?: string;

  @Column({ nullable: true })
  public brand: string;

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

  @ManyToMany(() => User)
  @JoinTable({name: "user_vehicle"})
  public users?: User[];

  @Column({nullable: true, type: "boolean", default: false})
  public isDeleted: boolean;

}
