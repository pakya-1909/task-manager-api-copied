const express = require('express')

require('./db/mongoose')

const userRouter = require('./routers/user')
const workRouter = require('./routers/workload')

const app = express()
const port = process.env.PORT

 
app.use(express.json())
app.use(userRouter)
app.use(workRouter)
 

app.listen(port,()=>{
    console.log('server running on port ' + port)
})

