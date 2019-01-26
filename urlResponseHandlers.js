var url = require("url");
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'ProyectoAitor.db')
const usuadmin = "admin";
const passadmin = "root1234";


exports.loginApp = loginApp;

function loginApp(req, res){
	var check = 0;

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
	    /*
		Index de números
		1 - Administrador
		2 - Alumno
		3 - Docente
		4 - Familia
		0 - Error
	    */

	    //Si es el administrador de la aplicación
	    if(em==usuadmin && contr==passadmin){
	    	console.log("Usuario administrador");
	    	console.log(res.write(""+1)); //Devolvemos un 1 si el login es satisfactorio
	    	res.end();
	    }else{	
	    	//Si es un usuario normal
	    	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
	    		if(err){return console.error(err.message);}
	    		console.log("Entrando en la Base de Datos "+ dbPath);
		    	
		    	//Creamos la consulta de buscar el email y pass introducido ALUMNO
		    	let sql_usuPass_alum = "SELECT email_a, contra_usu_a FROM alumno WHERE email_a ='"+em+"' AND contra_usu_a='"+contr+"'";
		    
		    	db.each(sql_usuPass_alum, (err, row)=>{
		    		if (err){throw err;}
		    		db.close();
		    		console.log("Alumno");
		    		console.log(res.write(""+2)); //El usuario alumno existe en la base de datos
		    		res.end(); 
		    		check = 1;   		
		    	});	
		    	/*
		    	if(check != 1){
			    	//Creamos la consulta de buscar el email y pass introducido DOCENTE
			    	let sql_usuPass_doc = "SELECT email_d, contra_usu_d FROM docente WHERE email_d ='"+em+"' AND contra_usu_d='"+contr+"'";
			    
			    	db.each(sql_usuPass_doc, (err, row)=>{
			    		if (err){throw err;}
			    		db.close();
			    		console.log("Docente");
			    		console.log(res.write(""+3)); //El usuario docente existe en la base de datos
			    		res.end();   
			    		check = 1; 		
			    	});	

		    	}*/

		    	if(check != 1){
			    	//Creamos la consulta de buscar el email y pass introducido FAMILIA
			    	let sql_usuPass_fam = "SELECT email_TL1, contr_usu_TL1 FROM familia WHERE email_TL1 ='"+em+"' AND contr_usu_TL1='"+contr+"'";
			    
			    	db.each(sql_usuPass_fam, (err, row)=>{
			    		if (err){throw err;}
			    		db.close();
			    		console.log("TL1");
			    		console.log(res.write(""+4)); //El usuario TL existe en la base de datos
			    		res.end();   
			    		check = 1; 		
			    	});	

		    	}

		    	if(check != 1){
			    	//Creamos la consulta de buscar el email y pass introducido FAMILIA
			    	let sql_usuPass_fam = "SELECT email_TL2, contr_usu_TL2 FROM familia WHERE email_TL2 ='"+em+"' AND contr_usu_TL2='"+contr+"'";
			    
			    	db.each(sql_usuPass_fam, (err, row)=>{
			    		if (err){throw err;}
			    		db.close();
			    		console.log("TL2");
			    		console.log(res.write(""+4)); //El usuario TL existe en la base de datos
			    		res.end();   
			    		check = 1; 		
			    	});	

		    	}
		    	if(check == 0){
		    		res.write(""+0);
		    	}

		    	//db.close();
	    	});
	    	
	    }
}