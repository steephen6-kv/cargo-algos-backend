import { EmployeeDto } from "../dto/EmployeeDto";
import { EmployeeDao } from "../repository/EmployeeDao";
import SearchResult from "../util/rest/searchresult";

export class EmployeeService {
  constructor(
    private employeeDao: EmployeeDao,
  ) {}

  // public createEmployee = async (
  //   employeeData: EmployeeDto
  // ): Promise<any> => {
  //   const employeeDetail: Entity1 = await this.employeeDao.createEmployee(employeeData);
  //   // employeeData.password = await bcrypt.hash(employeeData.password, 10);
  //   return employeeDetail;
  // }

  public getAllEmployees = async (): Promise<SearchResult> => {
    const results = await this.employeeDao.getAllEmployees();
    return results;
  }
}
