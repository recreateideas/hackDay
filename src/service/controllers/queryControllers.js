const axios = require('axios');
const parser = require('mongodb-query-parser');
const { getDB } = require('../utils/dbUtils');
const ObjectID = require('mongodb').ObjectID;


const insertProducts = async (product) => {
    let productDetails = Object.assign({}, product, {
        _id: new ObjectID(),
        dateCreated: new Date(),
    });
    await getDB().collection('products').insertOne(productDetails, (err, result) => {
        const response = result.toJSON();
        // console.log(response);
        if (err) {
            console.log('Error');
            return false;
        }
        else if (response.ok === 1) {
            console.log('Inserted OK');
            return true;
        }
        else if (response.ok !== 1) {
            console.log('Not Inserted');
            return false;
        }
        
    });
};



const compareProduct = async (product) => {
    // console.log(product);
    const price = (parseFloat(product.cloudiqProductPrice) * 51.85 - 1).toString().split('.')[0];
    const url = `https://price-api.datayuge.com/api/v1/compare/search?api_key=CpNdKIt2fovc1KC1oszOftIwsYE0QLNu8jU&product=${product.cloudiqProductName}&filter=brand%3A${product.cloudiqProductBrand}&price_start=0&price_end=${price}&page=1`;
    // console.log(url);
    try {
        const res = await axios.get(url);
        console.log(`Found: ${res.data.data && res.data.data.length} cheaper items with the comparison API`);
        console.log('for example: ',res.data.data && res.data.data[0]);
        // if (res.data.status === false) return {thirdParty: 'true'};
        if (res.data.data && res.data.data.length > 0) return cloudiqfyResult(res.data.data[0]);
        else return {thirdParty: 'true'};
    } catch (err) {
        console.log('INDEX ::sendProduct ->', err);
    } 
};

const cloudiqfyResult = (product) => {
    const price = (product.product_lowest_price / 51.85).toFixed(2).toString();
    console.log(price);
    data = {
        cloudiqProductName: product.product_title,
        cloudiqProductPrice: price,
        cloudiqProductImage: product.product_image,
        cloudiqProductUrl: product.product_link,
        thirdParty: 'false'
    };
    return data;
};

const findCheaperLocalProduct = async (product) => {
    try{
        const query = parser(`{"price": {$lt : ${product.cloudiqProductPrice}}}`);
        const results = await getDB().collection('products').find(query).limit(1).toArray();
        console.log('results ',results);
        if(results && results[0]) {
            results[0].thirdParty= 'false';
            return results[0];
        }
    }catch(err){
        console.log('ERROR', err);
    }

    // else cheapest item in store
};


module.exports = {

    handleProduct: async (req, res) => {
        // console.log('saveBody ', req.body);
        const product = req.body;

        let data =await insertProducts(product);
        data = await compareProduct(product);
        console.log(data);
        if(data.thirdParty == 'true'){
            data = await findCheaperLocalProduct(product);
        }
        console.log("DATA: ",data);
        if(data ===  undefined ) data = {thirdParty: true};
        res.json(data);
    }

};
