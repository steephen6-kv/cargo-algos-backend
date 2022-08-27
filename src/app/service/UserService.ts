import { EmployeeDto } from "../dto/EmployeeDto";
import { UserDao } from "../repository/UserDao";
import SearchResult from "../util/rest/searchresult";

export class UserService {
  constructor(
    private UserDao: UserDao,
  ) {}

  // public createEmployee = async (
  //   employeeData: EmployeeDto
  // ): Promise<any> => {
  //   const employeeDetail: Entity1 = await this.UserDao.createEmployee(employeeData);
  //   // employeeData.password = await bcrypt.hash(employeeData.password, 10);
  //   return employeeDetail;
  // }

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
}
