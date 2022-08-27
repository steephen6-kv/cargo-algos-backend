import Joi from "joi";

export const getVehicleTypesInputSchema = {
    body: Joi.object().keys({
        limit: Joi.number().optional(),
        offset: Joi.number().optional()
    }).unknown(false)
};
