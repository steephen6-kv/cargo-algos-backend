import { RideDao } from "../repository/RideDao";
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
}
