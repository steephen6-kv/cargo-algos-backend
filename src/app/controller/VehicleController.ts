import { NextFunction, Response } from "express";
import APP_CONSTANTS from "../constants";
import { VehicleService } from "../service/VehicleService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
import { validate } from "express-validation";
import { getVehicleTypesInputSchema } from "../validation/VehicleSchema";

/**
 * Implementation of the VehicleController route.
 *
 */
class VehicleController extends AbstractController {
  private vehicleService: VehicleService;

  constructor(vehicleService: VehicleService) {
    super(`${APP_CONSTANTS.apiPrefix}/vehicles`);
    this.vehicleService = vehicleService;
    this.initializeRoutes();
  }

  protected initializeRoutes = (): void => {
    this.router.post(
      `${this.path}`,
      this.asyncRouteHandler(this.createVehicle)
    );
    this.router.get(
      `${this.path}/types`, validate(getVehicleTypesInputSchema), this.asyncRouteHandler(this.getVehicleTypes)
    );

  }

  /**
   * Create a Vehicle with given data.
   *
   * @returns Vehicle record
   */
  private createVehicle = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const vehicleData = request.body;
    const vehicleDetail = await this.vehicleService.createVehicle(
        vehicleData
    );
    response.send(
      this.fmt.formatResponse(
        vehicleDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  }

  private getVehicleTypes = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const searchParams = request.query;
    const {data, total} = await this.vehicleService.getVehicleTypes(searchParams);
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", total)
    );
  }

}

export default VehicleController;
