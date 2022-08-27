/**
 * Wraps Controllers for easy import from other modules
 */

import UserController from "./UserController";
import { UserService } from "../service/UserService";
import { UserDao } from "../repository/UserDao";
import VehicleController from "./vehicleController";
import { VehicleService } from "../service/VehicleService";
import { VehicleDao } from "../repository/VehicleDao";

const userDao = new UserDao();
const vehicleDao = new VehicleDao();
const employeeService = new UserService(userDao);
const vehicleService = new VehicleService(vehicleDao);

export default [
  new UserController(employeeService),
  new VehicleController(vehicleService)
];
