const ORDER = require('../model/OrderModel');


// create order route
const create_order_controler = async(req,res)=>{
    const {firstname,lastname,mobile,address,paymentMode} = req.body
    try {
        if(!firstname || !lastname || !mobile || !address || !paymentMode){
            res.json({status:'false',errMessage:'fill everywere'})
            return
        }
        if(mobile.length > 11){
          return  res.json({status:'false',errMessage:'mobile too long'})


        }
        const order = await ORDER.create(req.body)
        // const savedOrder = order.save()
        res.status(201).json(order)

        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
    }
}

module.exports = {
    create_order_controler
}

