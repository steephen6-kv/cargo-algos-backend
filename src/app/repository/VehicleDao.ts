import {
    getManager,
    getRepository,
    Repository,
} from "typeorm";
import { Vehicle } from "../entity/Vehicle";
import { getVehicleTypes } from "../query/vehicle";

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

    public getVehicleTypes = async (searchParams: any): Promise<any> => {
        const limit = searchParams?.limit || 1000;
        const offset = searchParams?.offset || 0;
        const {query, parameters} = getVehicleTypes(limit, offset);
        const resp = await getManager().query(query, parameters);
        return Array.isArray(resp) && resp.length > 0 ? resp : [];
    }

    public getById = async (vehicleId: string): Promise<Vehicle> => {
        const vehicleRepo: Repository<Vehicle> = getManager().getRepository(Vehicle);
        const vehicleData = await vehicleRepo.findOne(vehicleId);
        return vehicleData;
    }

}
