var url = require("url");
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'ProyectoAitor.db')
const usuadmin = "admin";
const passadmin = "root1234";


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

	    //Si es el administrador de la aplicación
	    if(em==usuadmin && contr==passadmin){
	    	console.log("Usuario administrador");
	    	console.log(res.write(""+1)); //Devolvemos un 1 si el login es satisfactorio
	    	res.end();
	    }else{	
	    	//Si es un usuario normal
	    	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
	    		if(err){return console.error(err.message);}
	    		console.log("Barruan");
		    	//Creamos la consulta de buscar el email y pass introducido
		    	let sql_usuPass_alum = "SELECT email_a, contra_usu_a FROM alumno WHERE email_a ='"+em+"' AND contra_usu_a='"+contr+"'";
		    
		    	db.each(sql_usuPass_alum, (err, row)=>{
		    		if (err){throw err;}
		    		db.close();
		    		console.log("Barruan 2");
		    		console.log(res.write(""+1)); //El usuario alumno existe en la base de datos
		    		res.end();    		
		    	});	

		    	//db.close();
	    	});
	    }

	    

}