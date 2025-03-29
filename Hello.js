const express = require('express')
const mongoose=require('mongoose')
const app=express();
app.use(express.json());

const Product = require('./model/product');
app.listen(3000,()=>{
    console.log('We used nodemon');
})

app.get('/',(req,res)=>{
  res.send("working");
});
app.get('/api/products',async (req,res)=>{
  try{
    const product = await Product.find({});
    res.status(200).json(product)
    }
  catch(error){
    res.status(500).json({message: error.message})
  }
});
app.get('/api/products/:id', async (req, res) => {
  try {
      const { id } = req.params;  // Extracting the ID from the URL

      const product = await Product.findById(id);  // Finding product by ID

      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);  // Return the matched product
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);  // ✅ Pass req.body here
    res.status(201).json(product);  // Use status 201 for resource creation
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const updatedProduct = await Product.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }  // Return updated doc & validate
      );

      if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(updatedProduct);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


app.delete('/api/products/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

mongoose.connect('mongodb+srv://nivethida04:rwk4dUwmeNfiHrE6@cluster0.qirt3.mongodb.net/CrudAPI?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {console.log('Mongo Db Connected!')

})
.catch((err)=>{
    console.log('connection failed',err)
})