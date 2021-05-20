const utilsService = require("../utils/utils.service");
const nodeFetch = require("node-fetch");
const { createApi } = require("unsplash-js");
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch
})

const getImagesByQueryAndPage = async (query, page) => {
  try {
    if(query === undefined) query = 'cover';

    const response = await unsplash.search.getPhotos({
      query,
      page, 
      perPage: 9
    })

    return utilsService.generateResponse(200, response);
  } catch(e) {
    console.log("why is it here?");
    return utilsService.generateResponse(400, {message: e});
  }
}

module.exports = {
  getImagesByQueryAndPage
}