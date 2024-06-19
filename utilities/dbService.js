import collections from "../collections";
import { paginationFn } from "./pagination";

const createOneRecord = async (modelName, data) => {
  try {
    return await collections[modelName](data).save();
  } catch (error) {
    console.log("<<<<<<<<<<<<createOneRecord>>>>>>>>>>>>>", modelName, error);
    throw new Error(error);
  }
};

const createManyRecords = async (modelName, data) => {
  try {
    return await collections[modelName].insertMany(data);
  } catch (error) {
    console.log("<<<<<<<<<<<<createManyRecords>>>>>>>>>>>>>", modelName, error);
    throw new Error(error);
  }
};

const findOneRecord = async (
  modelName,
  query,
  options = {},
  isCollation = false
) => {
  try {
    if (isCollation)
      return await collections[modelName]
        .findOne(query, options)
        .collation({ locale: "en", strength: 2 });
    return await collections[modelName].findOne(query, options);
  } catch (error) {
    console.log("<<<<<<<<<<<<findOneRecord>>>>>>>>>>>>>", modelName, error);
    throw new Error(error);
  }
};

const recordsCount = async (modelName, query, options = {}) => {
  try {
    return await collections[modelName].countDocuments(query);
  } catch (error) {
    console.log("<<<<<<<<<<<<recordsCount>>>>>>>>>>>>>", modelName, error);
    throw new Error(error);
  }
};

const findOneAndUpdateRecord = async (
  modelName,
  query,
  payload,
  options = {}
) => {
  try {
    return await collections[modelName].findOneAndUpdate(
      query,
      payload,
      options
    );
  } catch (error) {
    console.log(
      "<<<<<<<<<<<<findOneAndUpdateRecord>>>>>>>>>>>>>",
      modelName,
      error
    );
    throw new Error(error);
  }
};

const aggregateData = async (modelName, query, isCollation = false) => {
  try {
    if (isCollation)
      return await collections[modelName]
        .aggregate(query)
        .collation({ locale: "en" });
    return await collections[modelName].aggregate(query);
  } catch (error) {
    console.log("<<<<<<<<<<<<aggregateData>>>>>>>>>>>>>", modelName, error);
    throw new Error(error);
  }
};

module.exports = {
  findOneRecord,
  aggregateData,
  findOneAndUpdateRecord,
  recordsCount,
  createManyRecords,
  createOneRecord,
};
