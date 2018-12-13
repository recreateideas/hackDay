const axios = require('axios');

console.log('index');


(() => {

    const connectToDB = async () => {
        try {
            const res = await axios.post('http://localhost:5011/db/connection', { connectionType: 'connect',});
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log('INDEX ::connectToDB ->',err);
        }
    };

    const sendProduct = async () => {
        try {
            const res = await axios.get('http://localhost:5011/product', { productName: 'item', productPrice: '$20.00' });
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log('INDEX ::sendProduct ->',err);
        }
    };

    // const findProducts = async () => {
    //     try {
    //         const res = await axios.get('http://localhost:5011/find', { productName: 'item', productPrice: '$20.00' });
    //         console.log(res.data);
    //         return res.data;
    //     } catch (err) {
    //         console.log('INDEX ::findProducts ->',err);
    //     }
    // };

    
    setTimeout(()=>{ 
        connectToDB();
    }, 1500);

    // setTimeout(()=>{ 
    //     sendProduct();
    // }, 3000);

    // setTimeout(()=>{ 
    //     findProducts();
    // }, 3500);

}

)();
