const axios = require('axios');
const parser = require('mongodb-query-parser');
const { getDB } = require('../utils/dbUtils');
const ObjectID = require('mongodb').ObjectID;


const insertProduct = async (product) => {
    try{
        let productDetails = Object.assign({}, product, {
            _id: new ObjectID(),
            dateCreated: new Date(),
        });
        productDetails.cloudiqProductPrice = parseFloat(productDetails.cloudiqProductPrice);
        const query = await getDB().collection(product.cloudiqProductDomain).insertOne(productDetails);
        if(query.result.ok === 1 && query.result.n === 1){
            console.log('\n\n-> Product Inserted !!\n');
            return true;
        } else {
            console.log('ERROR: Product Not Inserted !!');
            return false;
        }
    }catch(err){
        console.log('INDEX ::insertProduct: ',err);
    }
   
};



const compareProduct = async (product) => {
    try {
        const price = (parseFloat(product.cloudiqProductPrice) * 51.85 - 1).toString().split('.')[0];
        const url = `https://price-api.datayuge.com/api/v1/compare/search?api_key=CpNdKIt2fovc1KC1oszOftIwsYE0QLNu8jU&product=${product.cloudiqProductName}&filter=brand%3A${product.cloudiqProductBrand}&price_start=0&price_end=${price}&page=1`;
        const res = await axios.get(url);
        console.log(`-> Found${res.data.data && typeof res.data.data !== 'string' && res.data.data.length === 50 ? ` at least` : ``} ${res.data.data && res.data.data.length} cheaper items with the comparison API\n`);
        if (res.data.data && res.data.data.length > 0) {
            return {isBestPrice: 'false'};
        }
        else {
            return {isBestPrice: 'true'};
        }
    } catch (err) {
        console.log('INDEX ::sendProduct: ',err);
    } 
};

const findCheaperLocalProduct = async (product) => {
    console.log(`-> Now Looking for local items cheaper than ${product.cloudiqProductName}...\n`);
    try{
        const query = parser(`
            {
                "cloudiqProductName": {$not: /${product.cloudiqProductName}/},
                "cloudiqProductCategory":"${product.cloudiqProductCategory}",
                "cloudiqProductPrice": {$lt : ${product.cloudiqProductPrice}}
            }
        `);
        const result = await getDB().collection(product.cloudiqProductDomain).findOne(query);
        if(result) {
            console.log('-> Found!\n');
            result.cloudiqProductPrice = result.cloudiqProductPrice.toFixed(2);
            result.isBestPrice= 'false';
            return result;
        } else {
            console.log('-> None Found!\n');
            return {isBestPrice: 'true'};
        }
    }catch(err){
        console.log('INDEX ::findCheaperLocalProduct: ', err);
    }
};


module.exports = {

    handleProduct: async (req, res) => {
        try{
            const product = req.body;

            await insertProduct(product);
            data = await compareProduct(product);
            if(data.isBestPrice == 'false'){
                data = await findCheaperLocalProduct(product);
            }
            res.json(data);
        }catch(err){
            console.log('INDEX ::handleProduct: ', err);
            res.json({});
        }

    }

};
