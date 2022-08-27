import { NextFunction, Response } from "express";
import APP_CONSTANTS from "../constants";
import { RideService } from "../service/RideService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
import { validate } from "express-validation";
import { getAllRidesInputSchema } from "../validation/RideSchema";
/**
 * Implementation of the UserController route.
 *
 */
class RideController extends AbstractController {
  private rideService: RideService;

  constructor(rideService: RideService) {
    super(`${APP_CONSTANTS.apiPrefix}/rides`);
    this.rideService = rideService;
    this.initializeRoutes();
  }

  protected initializeRoutes = (): void => {
    this.router.get(
      `${this.path}`, validate(getAllRidesInputSchema), this.asyncRouteHandler(this.getAllRides)
    );
  }

  private getAllRides = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const searchParams = request.body;
    const { data, total } = await this.rideService.getAllRides(searchParams);
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", total)
    );
  }
}

export default RideController;