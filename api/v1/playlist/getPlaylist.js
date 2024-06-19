import { Joi } from "utilities/schemaValidate";

export const getPlayListSchema = Joi.object({
  page: Joi.number().default(1).required(),
  limit: Joi.number().default(10).required(),
  searchText: Joi.string().label("searchText"),
  sortBy: Joi.string().allow(null,'').default("").label("sortBy"),
  sortMode: Joi.number().allow(null,'').default(1).label("sortMode"),
});
