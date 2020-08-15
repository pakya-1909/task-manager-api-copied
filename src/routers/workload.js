const express = require('express')
const auth = require('../middleware/auth')
const workload = require('../modles/workload')
const router = new express.Router()

router.get('/workload',auth, async(req,res)=>{
    try {
        const work = await workload.find({owner: req.user._id})
        // await req.user.populate({
        //     path : 'work',
        //     match : {
        //         number : 26
        //     }
        // }).execPopulate()
        res.send(work)
    } catch (error) {
        res.status(500).send()
    }

})// working

router.get('/workload/:id', auth , async(req,res)=>{
    const _id = req.params.id
    try {
        const work = await workload.findOne({_id , owner: req.user._id})
        if(!work){
            res.status(404).send()
        }
        res.send(work)
    } catch (error) {
        res.status(500).send() 
    }
    
})// working

router.post('/workload', auth, async (req,res)=>{
    const work = new workload ({
        ...req.body,
        owner : req.user._id
    })
    try {
        await work.save()
        res.status(201).send(work) 
    } catch (error) {
        res.status(400).send(error)
    }
})//working

router.patch('/workload/:id', auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['subject','number']
    const isValidOperator = updates.every((update)=>{
        return allowedUpdate.includes(update)
    })

    if(!isValidOperator){
        return res.status(400).send({ error : 'invalid update'})
    }

    try {
        const work = await workload.findOne({_id : req.params.id , owner : req.user._id })
        // const work = await workload.findById(req.params.id)   
        
        if(!work){
            return res.status(404).send()
        }

        updates.forEach((update)=>{
            work[update] = req.body[update]
        })
        await work.save()
        res.send(work)
    } catch (e) {
        res.status(400).send(e)
    }
}) // working

router.delete('/workload/:id', auth, async (req,res)=>{
    try {
        const deleteWork = await workload.findOneAndDelete({_id : req.params.id, owner : req.user._id})
        if(!deleteWork){
            return res.status(404).send()
        }   

        res.send(deleteWork)
    } catch (e) {
        res.status(500).send()
    }
}) // working

module.exports = router


