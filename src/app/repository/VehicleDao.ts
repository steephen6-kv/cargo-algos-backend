import {
    getRepository,
    Repository,
} from "typeorm";
import { Vehicle } from "../entity/Vehicle";
import SearchResult from "../util/rest/searchresult";

/**
 * Handles CRUD operations
 */
export class VehicleDao {
    public createVehicle = async (
        vehicleData: Partial<Vehicle>
    ): Promise<Vehicle> => {
        const vehicleRepo: Repository<Vehicle> = getRepository(Vehicle);
        const vehicleDetail: Vehicle = await vehicleRepo.save(vehicleData);
        return vehicleDetail;
    }

}
