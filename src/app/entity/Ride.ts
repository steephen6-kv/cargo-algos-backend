import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { User } from "./user";
import { Vehicle } from "./Vehicle";

@Entity()
export class Ride {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: false })
  public startPoint: string;

  @Column({ nullable: false })
  public destinationPoint: string;

  @Column({ type: "timestamp", nullable: false })
  public tripStartDate?: Date;

  @ManyToOne(() => User, (user) => user.rides)
  public user: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.rides)
  public vehicle: Vehicle;

  @Column({ nullable: true })
  public availableCapacity: number;

  @Column({nullable: true, type: "boolean", default: false})
  public isDeleted: boolean;

  @CreateDateColumn({ type: "timestamp" })
  public createdDate?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedDate?: Date;
}
