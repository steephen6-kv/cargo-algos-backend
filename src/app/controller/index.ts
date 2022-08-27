/**
 * Wraps Controllers for easy import from other modules
 */

import EmployeeController from "./EmployeeController";
import { EmployeeService } from "../service/EmployeeService";
import { EmployeeDao } from "../repository/EmployeeDao";

const employeeDao = new EmployeeDao();
const employeeService = new EmployeeService(employeeDao);

export default [
  new EmployeeController(employeeService)
];
