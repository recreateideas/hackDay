const axios = require('axios');

console.log('index');


(() => {
    const getProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:5011`, { productName: 'item', productPrice: '$20.00' });
            return res.data;
        } catch (err) {
            console.log('error');
        }
    };
    getProduct();

}

)();
