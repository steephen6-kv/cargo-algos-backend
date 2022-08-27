import { getManager } from "typeorm";
import { Ride } from "../entity/Ride";
import { getAllRides } from "../query/ride";

export class RideDao {
    public getAllRides = async (searchParams: any): Promise<any> => {
        searchParams.limit = searchParams?.limit || 1000;
        searchParams.offset = searchParams?.offset || 0;
        const {query, parameters} = getAllRides(searchParams);
        const resp = await getManager().query(query, parameters);
        return Array.isArray(resp) && resp.length > 0 ? resp : [];
    }

    public getById = async (id: string): Promise<Ride> => {
        const rideData = await getManager().getRepository(Ride)
            .findOne(id, { where: { isDeleted: false }, relations: ["user", "vehicle"] });
        return rideData;
      }
}
