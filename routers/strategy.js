'use strict'

var express = require ('express')
,   router  = express.Router()
,   con     = require ('../config/database')

// "localhost:3000/"
router.get('/', (req, res) =>{
  var stm = "SELECT * FROM financial.stratedy_detail";
  con.query( stm , (error, result) => {
    if(error) {
      res.json({message: 'Error en el servidor..'})
    } else {
      res.json({success: true, result})
    }
  })
})

// "localhost:3000/strategy/find/1233"
router.get('/find/:id', (req, res) => {
  var stm = "SELECT * FROM financial.stratedy_detail WHERE idstratedy_detail = ?";
  con.query( stm , [req.params.id], (error, result) => {
    if(error) {
      res.json({message: 'Error en el servidor..'})
    } else {
      res.json({success: true, result})
    }
  })

})

// "localhost:3000/strategy/new"
router.post('/new', (req, res) => {
  res.json({message: 'Aqui crearas una nueva estrategia', result: req.body})
})


module.exports = router
