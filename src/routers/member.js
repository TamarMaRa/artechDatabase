const express = require('express')
const Member = require('../models/member')
const auth = require('../middleware/auth')
const router = new express.Router()

//create member
router.post('/members', auth, async (req, res) => {
    const member = new Member({
        ...req.body,
        owner: req.user._id
    })

    try {
        await member.save()
        res.status(201).send(member)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get all members, must be logged in
router.get('/members', auth, async (req, res) => {
    try {
        await req.user.populate('members').execPopulate()
        res.send(req.user.members)
    } catch (e) {
        res.status(500).send()
    }
})

//get member by id, must be logged in
router.get('/members/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const member = await Member.findOne({ _id, owner: req.user._id })

        if (!member) {
            return res.status(404).send()
        }

        res.send(member)
    } catch (e) {
        res.status(500).send()
    }
})

//update member's data, must be logged in
router.patch('/members/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'team']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const member = await Member.findOne({ _id: req.params.id, owner: req.user._id})

        if (!member) {
            return res.status(404).send()
        }

        updates.forEach((update) => member[update] = req.body[update])
        await member.save()
        res.send(member)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete member, must be logged in
router.delete('/members/:id', auth, async (req, res) => {
    try {
        const member = await Member.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!member) {
            res.status(404).send()
        }

        res.send(member)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router