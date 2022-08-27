
import { Vehicle } from "../entity/Vehicle";
import { VehicleDao } from "../repository/VehicleDao";

export class VehicleService {
  constructor(
    private vehicleDao: VehicleDao
  ) {}

  public createVehicle = async (
    vehicleData: any
  ): Promise<any> => {
    const vehicleDetail: Vehicle = await this.vehicleDao.createVehicle(vehicleData);
    // employeeData.password = await bcrypt.hash(employeeData.password, 10);
    return vehicleDetail;
  }

}
