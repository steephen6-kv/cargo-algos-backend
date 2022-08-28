
import { Vehicle } from "../entity/Vehicle";
import { UserDao } from "../repository/UserDao";
import { VehicleDao } from "../repository/VehicleDao";

export class VehicleService {
  constructor(
    private vehicleDao: VehicleDao,
    private userDao: UserDao
  ) {}

  public createVehicle = async (
    vehicleData: any
  ): Promise<any> => {
    const user = await this.userDao.getById(vehicleData.userId);
    vehicleData.users = [user];
    const vehicleDetail: Vehicle = await this.vehicleDao.createVehicle(vehicleData);
    return vehicleDetail;
  }

  public getVehicleTypes = async (searchParams: any): Promise<any> => {
    const resp: any[] = await this.vehicleDao.getVehicleTypes(searchParams);
    if (Array.isArray(resp) && resp.length > 0) {
      const data = resp.map((vehicle) => vehicle.type);
      return {data, length: data.length, total: data.length};
    }
    return {data: null, length: null, total: null};
  }

}
