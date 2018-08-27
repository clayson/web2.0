const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {save_user_information, get_list_of_participants, delete_users} = require('./models/server_db');
const path = require('path');
const publicPath = path.join(__dirname, './public');
const payPal = require('paypal-rest-sdk')

/* handling all the parsing*/

app.use(bodyParser.json());
app.use(express.static(publicPath));

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AZkqXST9kuMi9x7MIW8QzuGfIva6ZKNj-euXJqmDvpcjFe9BpFlhrottYIM7TRNhDCUv8cf8Db6ZpK1F',
  'client_secret': 'EKRhdwM9PLQhA975lnudEKtSeoaOPNnkfv1R_SuwRlhWZsnWbx75n5WAISB-8bffgBrMcwyupqKugOey'
});

app.post('/post_info', async (req,res)=>{
  var email = req.body.email;
  var amount = req.body.amount;

  if(amount <= 1){
    return_info = {};
    return_info.error = true;
    return_info.message = "The amount should be greater than 1";
    return res.send(return_info);
  }

  var result = await save_user_information({"Email" : email, "Amount" : amount});
    res.send(result);
});

app.get('/get_total_amount', async (req,res)=>{
  var result = await get_total_amount();
  res.send(result);
});

app.listen(3000,()=>{
  console.log('server running on port 3000');
})
