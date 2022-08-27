import { getManager } from "typeorm";
import { getAllRides } from "../query/ride";

export class RideDao {
    public getAllRides = async (searchParams: any): Promise<any> => {
        searchParams.limit = searchParams?.limit || 1000;
        searchParams.offset = searchParams?.offset || 0;
        const {query, parameters} = getAllRides(searchParams);
        const resp = await getManager().query(query, parameters);
        return Array.isArray(resp) && resp.length > 0 ? resp : [];
    }
}
