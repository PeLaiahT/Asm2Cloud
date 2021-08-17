const {MongoClient,ObjectId} = require('mongodb');
const URL ='mongodb+srv://asm1cloud:Dkmmai12@cluster0.pmuth.mongodb.net/test'
const DATABASE_NAME = 'Products'

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}
async function getAllProduct() {
    const dbo = await getDB();
    const allProducts = await dbo.collection("product").find({}).toArray();
    return allProducts;
}
async function addProduct(newProduct) {
    const dbo = await getDB();
    const newP = await dbo.collection("product").insertOne(newProduct);
}
async function deleteProduct(idInput) {
    const dbo = await getDB();
    await dbo.collection("product").deleteOne({ _id: ObjectId(idInput) });
}
async function updateProduct(id, nameInput, priceInput, imgInput) {
    const dbo = await getDB();
    await dbo.collection("product").updateOne({ _id: ObjectId(id) }, { $set: { Name: nameInput, Price: priceInput, Image: imgInput } });
}
async function getProductByID(idInput) {
    const dbo = await getDB();
    const getStudent = await dbo.collection("product").findOne({ _id: ObjectId(idInput) });
    return getStudent;
}
module.exports = {getDB,getAllProduct,addProduct,deleteProduct,updateProduct,getProductByID}