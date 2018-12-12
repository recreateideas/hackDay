module.exports = {

    findProduct: async (req,res) => {

        console.log('find',req.body);

        res.json({
            productPrice: '$10.00',
            productUrl: 'www.ischeapas.com/item',
            isCheaper: true,
        });
    }

};
