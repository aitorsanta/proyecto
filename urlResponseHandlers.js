var url = require("url");
const sqlite3 = require('sqlite3').verbose();


exports.loginApp = loginApp;

function loginApp(req, res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        em = _url.query.email;
	        contr = _url.query.contr;
	      } catch (e) {
	      }
	    }
	  }
	  	//PERFEKTO HELTZEN DA
	    //email en em || Contrasenia en contr
	    console.log(em+","+contr);

	    var db = new sqlite3.Database('./proyecto/ProyectoAitor.db', (err)=>{
	    	if(err){return console.error(err.message);}
	    	console.log("Connected to de DB");

	    	db.close();
	    })





}