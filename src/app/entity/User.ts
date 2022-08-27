import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Ride } from "./Ride";
import { Vehicle } from "./Vehicle";

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ unique: true })
  public phoneNumber: string;

  @Column({ nullable: true })
  public password?: string;

  @Column({ nullable: true })
  public license?: string;

  @CreateDateColumn({ type: "timestamp" })
  public createdDate?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedDate?: Date;

  @ManyToMany(() => Vehicle)
  @JoinTable({name: "user_vehicle"})
  public vehicles?: Vehicle[];

  @OneToMany(() => Ride, (ride) => ride.user)
  public rides?: Ride[];

  @Column({nullable: true, type: "boolean", default: false})
  public isDriver: boolean;

  @Column({nullable: true, type: "boolean", default: false})
  public isDeleted: boolean;

  @Column({ nullable: true , default: "verification-pending" })
  public status?: string;

}
