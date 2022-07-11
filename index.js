const { Client } = require('@elastic/elasticsearch'); //7.1.12
const fs = require('fs');
require('dotenv').config();
const ApiError = require('../utils/ApiError');

// this is to connect client to ES server. No Authentication required as per  my ES Server Settings
const client = new Client({
  node: process.env.ELASTIC_URL,
});


const createIndex = async (index) => {
  // if the index does exist, don't create it.
  // I made each index id as "1". In higher versions of ES SDK, no need to specify id.
  const exists = await client.exists({ index: index, id: 1 });
  if (exists.body) {
    throw new ApiError(400, `index with name ${index} already exists`);
  }
  
  // create index API call
  const result = await client.index({
    index: index,
    id: 1,
    body: {
      mappings: { // specify properties of index
        dynamic: 'strict',
        properties: {
          brand: { type: 'text' },
          packing: { type: 'text', index: false }, // not available for querying
          price: { type: 'text' },
          company: { type: 'text' },
        },
      },
    },
  });
  return result;
};


const deleteIndex = async (index) => {
  const exists = await client.exists({ index: index, id: 1 });
  if (!exists.body) {
    throw new ApiError(400, 'Index doesnt exist');
  }
  // as all of my indices has id of 1. I will pass 1 as an id and the delete will depend on index
  const response = await client.delete({ index: index, id: 1 });
  return response;
};

const createDocument = async (index, document) => {
  const exists = await client.exists({ index, id: 1 });
  if (!exists.body) {
    throw new ApiError(400, 'Index doeesnt exist');
  }
  const body = JSON.parse(document);
  const response = await client.index({
    index,
    id: body.brand, //id of document
    body, // previously, having body: {documentJson} caused an error in searching
  });
  return response; // object having _index, _id, result, etc..
};

const searchDocument = async (index, keyword, value) => {
  const exists = await client.exists({ index, id: 1 });
  if (!exists.body) {
    throw new ApiError(400, 'Index doesnt exist');
  }
  const result = await client.search({
	  // to search by regex, case insensitive and retriece only 20 results
    index,
    body: {
      size: 20,
      query: {
        regexp: {
          [keyword]: {
            value: `.*${value}.*`,
            case_insensitive: true,
          },
        },
      },
    },
  });
  return result.body.hits.hits;
};

//to index a json file --> client.bulk can be used alternatively
const indexJsonDataset = async (index, datasetPath) => {
  
  const datasource = JSON.parse(fs.readFileSync(datasetPath));
  const result = [];
  datasource.forEach(async (document) => {
    const temp = await createDocument(index, JSON.stringify(document));
    result.push(temp);
  });
  return result;
};

const getClientInfo = async () => {
  const response = await client.info();
  return response;
};

const countDocumentsInIndex = async (index) => {
  const count = await client.count({ index });
  return count.body.count;
};

module.exports = {
  createDocument,
  searchDocument,
  createMedicinesIndex,
  createDoctorsIndex,
  deleteIndex,
  indexJsonDataset,
  getClientInfo,
  countDocumentsInIndex,
};
