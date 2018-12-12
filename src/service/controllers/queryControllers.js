module.exports = {

    findProduct: async (req,res) => {

        console.log('find ',req.body);

        res.json([{
            productName: 'Item1',
            productPrice: '$10.00',
            productUrl: 'www.ischeapas.com/item1',
            isCheaper: true,
        },
        {
            productName: 'Item2',
            productPrice: '$20.00',
            productUrl: 'www.ischeapas.com/item2',
            isCheaper: false,
        }]);
    },

    saveProduct: async (req,res) => {

        console.log('save ',req.body);

        res.json({
            productPrice: '$10.00',
            productUrl: 'www.ischeapas.com/item',
            isCheaper: true,
        });
    }

};
