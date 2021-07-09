const router = require('express').Router()
const order = require('../controller/order')

router.post('/input', (req, res) => {
    order.input(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/getAllOrder", (req, res) => {
    order.getAllOrder()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
  })

router.get("/dataOrderbyuser/:username", (req, res) =>{
    console.log(req.params.username)
    order.getOrderByUser(req.params.username)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put('/edit/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    order.EditOrder(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.delete('/delete/:id', (req, res) => {
    order.deleteOrder(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
  })

  module.exports = router