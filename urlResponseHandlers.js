var url = require("url");
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'ProyectoAitor.db')
const usuadmin = "admin";
const passadmin = "root1234";


exports.loginApp = loginApp;
exports.introNewStudent = introNewStudent;
exports.introNewTeacher = introNewTeacher;
exports.introNewFamily = introNewFamily;

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

		    	}

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

function generatePass(fecha, nombre){
	var pass = ""+fecha+nombre.substring(0,1);
	return pass;
}

function introNewStudent(req,res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        perfil = _url.query.perfil;
	        nombre = _url.query.nombre;
	        apellido1 = _url.query.apellido1;
	        apellido2 = _url.query.apellido2;
	        fechaNacimiento = _url.query.fechaNacimiento;
	        dni = _url.query.dni;
	        email = _url.query.email;
	      } catch (e) {
	      }
	    }
	  }

	  //Contraseña generada a partir del nombre y la fecha de nacimiento
	  var con = generatePass(fechaNacimiento, nombre);

	// Introducimos usuario en la BD
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		//Creamos la consulta de insertar el nuevo alumno
		let query_insert_alumno = "INSERT INTO alumno (DNI_a, nombre_a, apellido1_a, apellido2_a, fecha_nac_a, email_a, contra_usu_a) VALUES ('"+dni+"','"+nombre+"','"+apellido1+"','"+apellido2+"',"+fechaNacimiento+",'"+email+"','"+con+"')";
		
		db.run(query_insert_alumno, (err, row)=>{
			if (err){throw err;}
			console.log("Usuario "+nombre+" insertado correctamente.");		    		
	  	});	

	  	db.close();
	});
	    
}

function introNewTeacher(req,res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        perfil = _url.query.perfil;
	        nombre = _url.query.nombre;
	        apellido1 = _url.query.apellido1;
	        apellido2 = _url.query.apellido2;
	        fechaNacimiento = _url.query.fechaNacimiento;
	        dni = _url.query.dni;
	        email = _url.query.email;
	        telf = _url.query.telf1;
	      } catch (e) {
	      }
	    }
	  }
	
	 //Contraseña generada a partir del nombre y la fecha de nacimiento
	var con = generatePass(fechaNacimiento, nombre);
	
	// Introducimos usuario en la BD    
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		//Creamos la consulta de insertar el nuevo alumno
		let query_insert_docente = "INSERT INTO docente (DNI_d, nombre_d, apellido1_d, apellido2_d, fecha_nac_d, email_d, telefono_d, contra_usu_d) VALUES ('"+dni+"','"+nombre+"','"+apellido1+"','"+apellido2+"',"+fechaNacimiento+",'"+email+"',"+telf+",'"+con+"')";
		
		db.run(query_insert_docente, (err, row)=>{
			if (err){throw err;}
			console.log("Usuario "+nombre+" insertado correctamente.");		    		
	  	});	

	  	db.close();
	});
}

function introNewFamily(req,res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        perfil = _url.query.perfil;
	        nombre = _url.query.nombre;
	        apellido1 = _url.query.apellido1;
	        apellido2 = _url.query.apellido2;
	        fechaNacimiento = _url.query.fechaNacimiento;
	        dni = _url.query.dni;
	        email = _url.query.email;
	        telf = _url.query.telf1;

	        nombre2 = _url.query.nombre2;
	        apellido12 = _url.query.apellido12;
	        apellido22 = _url.query.apellido22;
	        fechaNacimiento2 = _url.query.fechaNacimiento2;
	        dni2 = _url.query.dni2;
	        email2 = _url.query.email2;
	        telf2 = _url.query.telf2;

	        calle = _url.query.calle;
	        portal = _url.query.portal;
	        piso = _url.query.piso;
	        mano = _url.query.mano;
	        cp = _url.query.cp;
			ciudad = _url.query.ciudad;
			mun = _url.query.mun;
			pais = _url.query.pais;

	      } catch (e) {
	      }
	    }
	  }
	    //Parametros
	    	console.log("TL1 "+perfil+","+nombre+","+apellido1+","+apellido2+","+fechaNacimiento+","+dni+","+email+","+telf);
	    	console.log("TL2 "+perfil+","+nombre2+","+apellido12+","+apellido22+","+fechaNacimiento2+","+dni2+","+email2+","+telf2);
	    	console.log(calle+", "+portal+", "+piso+", "+mano+", "+cp+", "+ciudad+", "+mun+", "+pais);


	//Contraseña generada a partir del nombre y la fecha de nacimiento
	  var con1 = generatePass(fechaNacimiento, nombre);
	  var con2 = generatePass(fechaNacimiento2, nombre2);

	// Introducimos usuario en la BD
	
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		//Creamos la consulta de insertar el nuevo TL1
		let query_insert_fam = "INSERT INTO familia (nombre_TL1, apellido1_TL1, apellido2_TL1, fecha_nac_TL1, email_TL1, telefono_TL1, DNI_TL1, contr_usu_TL1, nombre_TL2, apellido1_TL2, apellido2_TL2, fecha_nac_TL2, email_TL2, telefono_TL2, DNI_TL2, contr_usu_TL2, calle, portal, piso, mano, ciudad, cp, municipio, pais) VALUES ('"+nombre+"','"+apellido1+"','"+apellido2+"',"+fechaNacimiento+",'"+email+"',"+telf+",'"+dni+"','"+con1+"','"+nombre2+"','"+apellido12+"','"+apellido22+"',"+fechaNacimiento2+",'"+email2+"',"+telf2+",'"+dni2+"','"+con2+"','"+calle+"',"+portal+","+piso+",'"+mano+"','"+ciudad+"',"+cp+",'"+mun+"','"+pais+"')";	
		//let query_insert_tl2 = "INSERT INTO familia (nombre_TL2, apellido1_TL2, apellido2_TL2, fecha_nac_TL2, email_TL2, telefono_TL2, DNI_TL2, contr_usu_TL2) VALUES ('"+nombre2+"','"+apellido12+"','"+apellido22+"',"+fechaNacimiento2+",'"+email2+"',"+telf2+",'"+dni2+"','"+con2+"')";	
		//let query_insert_viv = "INSERT INTO familia (calle, portal, piso, mano, ciudad, cp, municipio, pais) VALUES ('"+calle+"',"+portal+","+piso+",'"+mano+"','"+ciudad+"',"+cp+",'"+mun+"','"+pais+"')";	

		db.run(query_insert_fam, (err, row)=>{
			if (err){throw err;}
			console.log("Usuarios "+nombre+", "+nombre2+" insertados correctamente.");		    		
	  	});	

	  	db.close();
	});
	    	
}