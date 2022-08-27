import { Ride } from "../entity/Ride";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { RideDao } from "../repository/RideDao";
import { ErrorCodes } from "../util/errorCode";
import SearchResult from "../util/rest/searchresult";

export class RideService {
  constructor(
    private rideDao: RideDao,
  ) {}

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
