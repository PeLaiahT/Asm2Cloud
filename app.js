const EXPRESS = require('express');
const { Int32, ObjectId } = require('mongodb');
const {getAllProduct,addProduct,deleteProduct,updateProduct,getProductByID} = require('./databaseHandler')
const APP = EXPRESS();
APP.set("view engine","hbs")
APP.set("views","./views");
APP.use(EXPRESS.urlencoded({extended:true}))

APP.get("/add", (req,res)=>{
    res.render("add");
})
APP.post("/add", async(req,res)=>{
    const nameInput = req.body.txtName;
    const priceInput = req.body.txtPrice;
    const imgInput = req.body.txtImg
    const newProduct = {Name:nameInput,Price:Int32(priceInput)+" $",Image:imgInput};
    await addProduct(newProduct);
    res.redirect('/');
})
APP.get("/update", async(req,res)=>{
    const allProducts = await getAllProduct();
    res.render('update',{data:allProducts})
})
APP.get("/delete", async(req,res)=>{
    const idInput = req.query.id;
    await deleteProduct(idInput);
    res.redirect('/update');
})
APP.get('/', async (req,res)=>{
    const allProducts = await getAllProduct();
    res.render('homepage',{data:allProducts})
})
APP.get('/edit', async (req,res)=>{
    const idInput = req.query.id;
    const getStudent = await getProductByID(idInput);
    res.render('edit',{product:getStudent})
})
APP.post('/edit', async (req,res)=>{
    const id = req.body.editId;
    const nameInput = req.body.editName;
    const priceInput = req.body.editPrice;
    const imgInput = req.body.editImg;
    await updateProduct(id, nameInput, priceInput, imgInput);
    res.redirect('/update');
})

const PORT = process.env.PORT || 5000;
APP.listen(PORT);



