import { EmployeeDto } from "../dto/EmployeeDto";
import { RegisterUserDto } from "../dto/RegisterUserDto";
import { User } from "../entity/user";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import UserAlreadyRegisteredException from "../exception/UserAlreadyRegisteredException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import UserNotVerifiedException from "../exception/UserNotVerifiedException";
import { UserDao } from "../repository/UserDao";
import { ErrorCodes } from "../util/errorCode";
import SearchResult from "../util/rest/searchresult";

export class UserService {
  constructor(
    private userDao: UserDao,
  ) {}

  // public createEmployee = async (
  //   employeeData: EmployeeDto
  // ): Promise<any> => {
  //   const employeeDetail: Entity1 = await this.UserDao.createEmployee(employeeData);
  //   // employeeData.password = await bcrypt.hash(employeeData.password, 10);
  //   return employeeDetail;
  // }

  public sendOtpForRegistration = async () => {
    // logic to send OTP
  }

  public registerUser = async (
    userRegistrationData: RegisterUserDto
  ): Promise<any> => {
    const user = await this.userDao.getByPhoneNumber(userRegistrationData.phoneNumber);

    if (user) {
      if (user.status === 'verified') {
        const error = ErrorCodes.USER_ALREADY_REGISTERED_ERROR;
        throw new UserAlreadyRegisteredException();
      }
      await this.sendOtpForRegistration();
      return user;
    }
    // employeeData.password = await bcrypt.hash(employeeData.password, 10); // Do later
    const registeredUserData: User = await this.userDao.register(userRegistrationData);
    await this.sendOtpForRegistration();
    return registeredUserData;
  }

  public getAllEmployees = async (): Promise<SearchResult> => {
    // const results = await this.UserDao.getAllEmployees();
    // return results;

    const records = [{id: 1, name: "ABC"}, {id: 2, name: "XYZ"}];
    return {
      data: records,
      length: records.length,
      total: 2,
    };
  }

  public getById = async (userId: string): Promise<User> => {
    const userData = await this.userDao.getById(userId);
    if (!userData) {
      const error = ErrorCodes.USER_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    return
  }

  public getUserByPhoneNumber = async (phoneNumber: string): Promise<User> => {
    const userData = await this.userDao.getByPhoneNumber(phoneNumber);
    if (!userData) {
      const error = ErrorCodes.USER_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    return userData;
  }
  
  // add bcrypt logic
  private verifyPassword = (inputPassword: string, userPassword: string): boolean => {
    return inputPassword === userPassword;
  }

  public login = async (phoneNumber: string, password: string): Promise<boolean> => {
    const userData = await this.UserDao.getByPhoneNumber(phoneNumber);
    if (!userData) {
      const error = ErrorCodes.USER_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    if (userData) {
      if (userData.status !== "verified") {
        throw new UserNotVerifiedException()
      }
      return this.verifyPassword(password, userData.password)
    }
    return false;
  }


}
