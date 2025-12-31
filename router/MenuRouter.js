const express=require('express');
const router=express.Router();
const MenuCard = require('./../Models/MenuItem');
// create MenuCard

router.post('/', async (req, res) => {
    try {

        const menuData = req.body;
        const menuItem = new MenuCard(menuData);
        const savedData = await menuItem.save();
        console.log("MenuCard created successfully!");
        res.status(201).json(savedData);

    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Internal server error." })
    }
}).get('/', async (req, res) => {
    try {
        const items = await MenuCard.find();
        res.status(200).json(items);

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server error.");
    }
});

router.get('/:dish',async (req,res)=>{
    try{
        const dish=req.params.dish;
        const items= await  MenuCard.find({ dish : dish });
        res.status(200).json(items);

    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error.'});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const menuId=req.params.id;
        const menuItem=req.body;
        const updatedMenu=await MenuCard.findByIdAndUpdate(menuId,menuItem,{
            new:true,
            runValidators:true
        });
        if(!updatedMenu){
            return res.status(404).json({Error:'MenuItem not found.'});
        }
        res.status(200).json(updatedMenu);
        console.log('MenuCard updated successfully!');

    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal Server error.'});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const menuID=req.params.id;
        const deletedItem=await MenuCard.findByIdAndDelete(menuID);
        if(!deletedItem){
            return res.status(404).json({Msg:'Item not found.'});
        }
        res.status(200).json({Msg : 'MenuItem deleted successfully.'});

    }catch(err){
         console.log(err);
        res.status(500).json({err:'Internal Server error.'});
    }
})

module.exports=router;

