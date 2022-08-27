import { NextFunction, Response } from "express";
import APP_CONSTANTS from "../constants";
import { EmployeeDto } from "../dto/EmployeeDto";
import authorize from "../middleware/authorize";
import validationMiddleware from "../middleware/validationMiddleware";
import { EmployeeService } from "../service/EmployeeService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
/**
 * Implementation of the EmployeeController route.
 *
 */
class EmployeeController extends AbstractController {
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employees`);
    this.employeeService = employeeService;
    this.initializeRoutes();
  }

  protected initializeRoutes = (): void => {
    this.router.post(
      `${this.path}`,
      this.asyncRouteHandler(this.createEmployee)
    );

    this.router.get(
      `${this.path}`,
      this.asyncRouteHandler(this.getAllEmployees)
    );

    // this.router.post(
    //   `${this.path}/login`,
    //   validationMiddleware(LoginDto, APP_CONSTANTS.body),
    //   this.asyncRouteHandler(this.login)
    // );
  }

  /**
   * Create a user with given data.
   *
   * @returns User record
   */
  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const employeeData: EmployeeDto = request.body;
    const employeeDetail = await this.employeeService.createEmployee(
      employeeData
    );
    response.send(
      this.fmt.formatResponse(
        employeeDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  }

  private getAllEmployees = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    // const urlParams = request.query;
    const { data, total } = await this.employeeService.getAllEmployees();
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", total)
    );
  }

  // private login = async (
  //   request: RequestWithUser,
  //   response: Response,
  //   next: NextFunction
  // ) => {
  //   const loginData: LoginDto = request.body;
  //   const loginDetail = await this.employeeService.employeeLogin(
  //     loginData.email.toLowerCase(),
  //     loginData.password
  //   );
  //   response.send(
  //     this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
  //   );
  // }
}

export default EmployeeController;
