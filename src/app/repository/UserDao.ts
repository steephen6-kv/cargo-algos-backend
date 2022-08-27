import {
  DeepPartial,
  DeleteResult,
  getManager,
  getRepository,
  Repository,
} from "typeorm";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";
import SearchResult from "../util/rest/searchresult";
import { EmployeeDto } from "../dto/EmployeeDto";
import { RegisterUserDto } from "../dto/RegisterUserDto";
import { User } from "../entity/user";

/**
 * Handles CRUD operations
 */
export class UserDao {
  // public createEmployee = async (
  //   employeeData: EmployeeDto
  // ): Promise<Entity1> => {
  //   const employeeRepo: Repository<Entity1> = getRepository(Entity1);
  //   const userDetail: Entity1 = await employeeRepo.save(employeeData);
  //   return userDetail;
  // };

  public register = async (
    userRegistrationData: RegisterUserDto
  ): Promise<User> => {
    const userRepo: Repository<User> = getRepository(User);
    const userDetail: User = await userRepo.save(userRegistrationData);
    return userDetail;
  };

  public getById = async (userId: string): Promise<User> => {
    const userRepo: Repository<User> = getManager().getRepository(User);
    const userData = await userRepo.findOne(userId);
    return userData;
  };

  public getByPhoneNumber = async (phoneNumber: string): Promise<User> => {
    const userRepo: Repository<User> = getManager().getRepository(User);
    const userData = await userRepo.findOne({ phoneNumber });
    return userData;
  };

  // public updateEmployee = async (
  //   employeeId: string,
  //   updateEmployeesPayload: DeepPartial<Entity1>
  // ): Promise<Entity1> => {
  //   const employeeRepo: Repository<Entity1> =
  //     getManager().getRepository(Entity1);
  //   const employeeDetail: Entity1 = await this.getEmployeeById(employeeId);
  //   if (employeeDetail) {
  //     updateEmployeesPayload.id = employeeDetail.id;
  //     return employeeRepo.save(updateEmployeesPayload);
  //   }
  // };

  // public getEmployeeById = async (employeeId: string): Promise<Entity1> => {
  //   const employeeRepo: Repository<Entity1> = getManager().getRepository(Entity1);
  //   const employeeData = await employeeRepo.findOne(employeeId);
  //   if (!employeeData) {
  //     const error = ErrorCodes.USER_NOT_FOUND;
  //     throw new EntityNotFoundException(error);
  //   }
  //   return employeeData;
  // };

  public getAllEmployees = async (): Promise<SearchResult> => {
    // const employeeRepo = getRepository(Entity1)
    //   .createQueryBuilder("employee")
    //   .leftJoinAndSelect("employee.departments", "departments");

    // if (searchParams.limit) {
    //   employeeRepo.take(searchParams.limit);
    // }

    // if (searchParams.offset) {
    //   employeeRepo.skip(searchParams.offset);
    // }

    // employeeRepo.orderBy(`employee.${searchParams.sort || "name"}`, 'DESC');

    // const [records, total] = await employeeRepo.getManyAndCount();
    const records = [{id: 1, name: "ABC"}, {id: 2, name: "XYZ"}];
    return {
      data: records,
      length: records.length,
      total: 2,
    };
  };
}
