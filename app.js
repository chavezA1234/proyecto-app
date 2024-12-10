const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); 

const { altaUsuario } = require('./src/class/alta.js');
const { consultaSaldo } = require('./src/class/consultaSaldo.js');
const { consultaMovimientos} = require('./src/class/consultaMovimientos.js');
const { actualizacionSaldo} = require('./src/class/actualizacionSaldo.js');

app.post('/menu', async (req, res) => {
 var opcion =0
 opcion = Number(req.body.opcion)
 var mensaje="";
 var response
 switch (opcion)
 {
    case 1: 
        altaUsuario(req.body)
        mensaje="1"
        console.log("entro a alta")
        response ={status:200,message:"ok"}
        break
    case 2:
        console.log("entro a operacion")
        var respuesta =  await consultaSaldo(req.body.email)
        var nuevo_saldo = 0.0
        var operacion=req.body.operacion
        if (operacion =="+")
        {
          nuevo_saldo=Number(respuesta)+Number(req.body.monto)
          actualizacionSaldo(respuesta,nuevo_saldo,req.body.email,operacion)
          console.log(nuevo_saldo)
          response ={status:200,message:"ok"}
          break
        }
        if (operacion =="-")
        {
          if (req.body.monto>0)
            {
              console.log("retiro")
              console.log(req.body.monto)
              console.log(respuesta)
              if (Number(req.body.monto) <= Number(respuesta)  )
              {
                nuevo_saldo=Number(respuesta)-Number(req.body.monto)
                actualizacionSaldo(respuesta,nuevo_saldo,req.body.email,operacion)
                console.log(nuevo_saldo)
                response ={status:200,message:"ok"}
    
              }else
              {
                console.log("saldo insuficiente")
              }
            }
            else{
              console.log("retiro no capturado ")
            }
        }
        
        
        
        break
    case 3: 
        console.log("entro a consultar moviviento")
        response =  await consultaMovimientos(req.body.email)
        break;
    case 4: 
        console.log("entro a consultar saldo")
        var respuesta =  await consultaSaldo(req.body.email)
        mensaje=respuesta
        response ={status:200,message:respuesta}
        break
    default :
    console.log("opcion no valida")
 }

  res.send(response);
});
app.listen(port, () => {
  console.log(`Web service listening at http://localhost:${port}`);
});