/**
 * Wraps Controllers for easy import from other modules
 */

import UserController from "./UserController";
import { UserService } from "../service/UserService";
import { UserDao } from "../repository/UserDao";
import VehicleController from "./vehicleController";
import { VehicleService } from "../service/VehicleService";
import { VehicleDao } from "../repository/VehicleDao";
import { RideDao } from "../repository/RideDao";
import { RideService } from "../service/RideService";
import RideController from "./RideController";

const userDao = new UserDao();
const vehicleDao = new VehicleDao();
const vehicleService = new VehicleService(vehicleDao, userDao);
const userService = new UserService(userDao);
const rideDao = new RideDao();
const rideService = new RideService(rideDao, userDao, vehicleDao);

export default [
  new VehicleController(vehicleService),
  new UserController(userService),
  new RideController(rideService)
];
