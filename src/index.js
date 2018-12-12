const axios = require('axios');

console.log('index');


(() => {
    const sendProduct = async () => {
        try {
            const res = await axios.post('http://localhost:5011/save', { productName: 'item', productPrice: '$20.00' });
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const findProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5011/find', { productName: 'item', productPrice: '$20.00' });
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    setTimeout(()=>{ 
        sendProduct();
    }, 3000);

    setTimeout(()=>{ 
        findProducts();
    }, 3500);

}

)();
