/**
 * Wraps Controllers for easy import from other modules
 */

import UserController from "./UserController";
import { UserService } from "../service/UserService";
import { UserDao } from "../repository/UserDao";
import { RideDao } from "../repository/RideDao";
import { RideService } from "../service/RideService";
import RideController from "./RideController";

const userDao = new UserDao();
const userService = new UserService(userDao);
const rideDao = new RideDao();
const rideService = new RideService(rideDao);

export default [
  new UserController(userService),
  new RideController(rideService)
];
