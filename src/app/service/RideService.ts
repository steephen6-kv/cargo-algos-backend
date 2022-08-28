import { Ride } from "../entity/Ride";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";
import { RideDao } from "../repository/RideDao";
import { UserDao } from "../repository/UserDao";
import { VehicleDao } from "../repository/VehicleDao";
import SearchResult from "../util/rest/searchresult";

export class RideService {
  constructor(
    private rideDao: RideDao,
    private userDao: UserDao,
    private vehicleDao: VehicleDao
  ) {}

  public createRide = async (
    rideData: any
  ): Promise<any> => {
    const user = await this.userDao.getById(rideData.userId);
    const vehicle = await this.vehicleDao.getById(rideData.vehicleId);
    rideData.user = user;
    rideData.vehicle = vehicle;
    const rideDetail: Ride = await this.rideDao.createRide(rideData);
    return rideDetail;
  }

  public getAllRides = async (searchParams: any): Promise<SearchResult> => {
    const resp: any[] = await this.rideDao.getAllRides(searchParams);
    if (Array.isArray(resp) && resp.length > 0) {
        return {data: resp, length: resp.length, total: resp[0].totalRidesCount };
    }
    return {data: null, length: null, total: null};
  }

  public getById = async (rideId: string): Promise<Ride> => {
    const rideData = await this.rideDao.getById(rideId);
    if (!rideData) {
      const error = ErrorCodes.RIDE_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    return rideData;
  }
}
