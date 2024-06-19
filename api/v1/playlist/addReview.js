import { Joi } from "utilities/schemaValidate";

export const addReviewSchema = Joi.object({
  songId: Joi.string().required(),
  review: Joi.number().required(),
});
