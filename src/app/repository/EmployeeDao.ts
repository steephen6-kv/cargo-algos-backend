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
import { Entity1 } from "../entity/Entity1";
import { EmployeeDto } from "../dto/EmployeeDto";

/**
 * Handles CRUD operations
 */
export class EmployeeDao {
  public createEmployee = async (
    employeeData: EmployeeDto
  ): Promise<Entity1> => {
    const employeeRepo: Repository<Entity1> = getRepository(Entity1);
    const userDetail: Entity1 = await employeeRepo.save(employeeData);
    return userDetail;
  };

  public updateEmployee = async (
    employeeId: string,
    updateEmployeesPayload: DeepPartial<Entity1>
  ): Promise<Entity1> => {
    const employeeRepo: Repository<Entity1> =
      getManager().getRepository(Entity1);
    const employeeDetail: Entity1 = await this.getEmployeeById(employeeId);
    if (employeeDetail) {
      updateEmployeesPayload.id = employeeDetail.id;
      return employeeRepo.save(updateEmployeesPayload);
    }
  };

  public getEmployeeById = async (employeeId: string): Promise<Entity1> => {
    const employeeRepo: Repository<Entity1> = getManager().getRepository(Entity1);
    const employeeData = await employeeRepo.findOne(employeeId);
    if (!employeeData) {
      const error = ErrorCodes.USER_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    return employeeData;
  };

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
