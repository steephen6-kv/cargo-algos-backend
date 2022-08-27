import { NextFunction, Response } from "express";
import APP_CONSTANTS from "../constants";
import { EmployeeDto } from "../dto/EmployeeDto";
import { LoginDto } from "../dto/LoginDto";
import { RegisterUserDto } from "../dto/RegisterUserDto";
import authorize from "../middleware/authorize";
import validationMiddleware from "../middleware/validationMiddleware";
import { UserService } from "../service/UserService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
/**
 * Implementation of the UserController route.
 *
 */
class UserController extends AbstractController {
  private userService: UserService;

  constructor(userService: UserService) {
    super(`${APP_CONSTANTS.apiPrefix}/users`);
    this.userService = userService;
    this.initializeRoutes();
  }

  protected initializeRoutes = (): void => {
    // this.router.post(
    //   `${this.path}`,
    //   this.asyncRouteHandler(this.createEmployee)
    // );

    this.router.post(
      `${this.path}/register`,
      this.asyncRouteHandler(this.registerUser)
    );

    this.router.get(
      `${this.path}`,
      this.asyncRouteHandler(this.getAllEmployees)
    );

    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginDto, APP_CONSTANTS.body),
      this.asyncRouteHandler(this.login)
    );
  }

  /**
   * Create a user with given data.
   *
   * @returns User record
   */
  // private createEmployee = async (
  //   request: RequestWithUser,
  //   response: Response,
  //   next: NextFunction
  // ) => {
  //   const employeeData: EmployeeDto = request.body;
  //   const employeeDetail = await this.userService.createEmployee(
  //     employeeData
  //   );
  //   response.send(
  //     this.fmt.formatResponse(
  //       employeeDetail,
  //       Date.now() - request.startTime,
  //       "OK"
  //     )
  //   );
  // }

  private registerUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const employeeData: RegisterUserDto = request.body;
    const employeeDetail = await this.userService.registerUser(
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
    const { data, total } = await this.userService.getAllEmployees();
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", total)
    );
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData: LoginDto = request.body;
    const loginDetail = await this.userService.login(
      loginData.phoneNumber,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  }
}

export default UserController;
