import Product from "../models/product.js";

export function getProduct(req,res){
    Product.find().then(
        (productList)=>{
            res.json({
                list: productList
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message: "Error"
            })
        }
    )
}

export function createProduct(req,res){
    
    //if you do not send a request without token 
    if(req.user == null){
        res.json({
            message : "you are not logged in"
        })

        return
    }

    //only admin can add product
    if(req.user != "admin"){
        res.json({
            message : "you are not an admin"
        })

        retrun 
    }
    
    const product = new Product(req.body)

    product.save().then(()=>{
        res.json({
            message: "Product created"
        })
    }).catch(()=>{
        res.json({
            message: "Product not created"
        })
    })
}

export function deleteProduct(req,res){
    Product.deleteOne({name: req.params.name}).then(
        ()=>{
            res.json(
                {
                    message: "Product delete successfully"
                }
            )
        }
    ).catch(()=>{
        res.json({
            message:"Product not created"
        })
    })
}


//get product when product search by name
export function getProductByName(req,res){
    const name = req.params.name;  //not through body of the postman. came through parameter

    Product.find({name : name}).then(
        (productList)=>{

            if(productList.length == 0){   //if product is not correct 
                res.json({
                    message: "Product not found"
                })
            }else{
                res.json({
                    list : productList
                })
            }   
        }
    ).catch(
        ()=>{
            res.json({
                message: "Error"
            })
        }
    )
}