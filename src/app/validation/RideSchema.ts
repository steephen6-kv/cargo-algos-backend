import Joi from "joi";

export const getAllRidesInputSchema = {
    body: Joi.object().keys({
        limit: Joi.number().optional(),
        offset: Joi.number().optional(),
        startPoint: Joi.string().required(),
        destinationPoint: Joi.string().required(),
        tripStartDate: Joi.date().iso().required(),
        shipmentWeight: Joi.number().required()
    }).unknown(false)
};
