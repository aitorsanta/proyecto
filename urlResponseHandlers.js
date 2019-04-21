var url = require("url");
var bigInt = require("big-integer"); //External library to work with big numbers
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'ProyectoAitor.db') //Path de la base de datos
const usuadmin = "admin";
const passadmin = "root1234";
var dniSave = ""; //Guardamos el dni aquí
var people = ""; //Variable que registra de qué tipo ha sido la última inserción
//VALORES PARA EL CIFRADO DE CONTRASEÑAS --> Procedencia: Ver apartado correspondiente de la memoria
var n = 253;
var e = 3;
var d = 147;


exports.loginApp = loginApp;
exports.introNewStudent = introNewStudent;
exports.introNewTeacher = introNewTeacher;
exports.introNewFamily = introNewFamily;
exports.changePassword = changePassword;
exports.matriculaAlumno = matriculaAlumno;
exports.obtenerCursos = obtenerCursos;
exports.obtenerProfesores = obtenerProfesores;
exports.matriculaProfesor = matriculaProfesor;
exports.matriculaTutor = matriculaTutor;
exports.matriculaAlumnoSinCurso = matriculaAlumnoSinCurso;
exports.actualizarMatricula = actualizarMatricula;
exports.obtenerNom = obtenerNom;
exports.obtenerNomP = obtenerNomP;
exports.obtenerCurso = obtenerCurso;
exports.introducirAsig = introducirAsig;
exports.introducirCurso = introducirCurso;
exports.mostrarAsig = mostrarAsig;
exports.obtenerClasesProfesor = obtenerClasesProfesor;
exports.matriculaAlumnoConCurso = matriculaAlumnoConCurso;
exports.introducirActividad = introducirActividad;
exports.mostrarActividades = mostrarActividades;
exports.actividadesTrimestre = actividadesTrimestre;
exports.actividadesTrimestreSinPeso = actividadesTrimestreSinPeso;
exports.calificaciones = calificaciones;
exports.mostrarAsigProf = mostrarAsigProf;
exports.mostrarAlumnosProf = mostrarAlumnosProf;
exports.mostrarActivProf = mostrarActivProf;
exports.mostrarIncidProf = mostrarIncidProf;
exports.guardarIncidencia = guardarIncidencia;
exports.obtenerIncidencias = obtenerIncidencias;
exports.mostrarAsigAlum = mostrarAsigAlum;
exports.mostrarIncidAlum = mostrarIncidAlum;
exports.obtenerIncidenciasAlum = obtenerIncidenciasAlum;
exports.obtenerTutores1 = obtenerTutores1;
exports.calif = calif;
exports.actualizarNotas = actualizarNotas;
exports.verNotas = verNotas;

/*
Función para logearte en la aplicación
*/
function loginApp(req, res){
	var check = 0;

	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        em = _url.query.email; //Email introducido por el usuario
	        contr = _url.query.contr; //Contraseña introducida por el usuario
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
	    	//Tenemos que cifrar la contraseña para que haga la comparación con la base de datos
	    	var contraCifrado = rsa(contr);
	    	
	    	//Si es un usuario normal
	    	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
	    		if(err){return console.error(err.message);}

	    		if(check != 1){
		    	//Creamos la consulta de buscar el email y pass introducido ALUMNO
		    	let sql_usuPass_alum = "SELECT email_a, contra_usu_a FROM alumno WHERE email_a ='"+em+"' AND contra_usu_a='"+contraCifrado+"'";
		    	db.each(sql_usuPass_alum, (err, row)=>{
		    		if (err){throw err;}
		    		//db.close();
		    		console.log("Alumno");
		    		console.log(res.write(""+2)); //El usuario alumno existe en la base de datos
		    		dniSave = getDNI(em, "alumno");
		    		people="alumno";
		    		check = 1;
		    		res.end();
		    	});	
		    	
		    	}if(check != 1){
			    	//Creamos la consulta de buscar el email y pass introducido DOCENTE
			    	let sql_usuPass_doc = "SELECT email_d, contra_usu_d FROM docente WHERE email_d ='"+em+"' AND contra_usu_d='"+contraCifrado+"'";
			    
			    	db.each(sql_usuPass_doc, (err, row)=>{
			    		if (err){throw err;}
			    		//db.close();
			    		console.log("Docente");
			    		res.write(""+3, function(err){/*res.end();*/});
			    		//console.log(res.write(""+3)); //El usuario docente existe en la base de datos
			    		dniSave = getDNI(em, "docente");
			    		people="docente"; 
			    		check = 1; 
			    		res.end();
			    	});	

		    	}

		    	if(check != 1){
			    	//Creamos la consulta de buscar el email y pass introducido FAMILIA
			    	let sql_usuPass_fam = "SELECT email_TL1, contr_usu_TL1 FROM familia WHERE email_TL1 ='"+em+"' AND contr_usu_TL1='"+contraCifrado+"'";
			    
			    	db.each(sql_usuPass_fam, (err, row)=>{
			    		if (err){throw err;}
			    		//db.close();
			    		console.log("TL1");
			    		res.write(""+4, function(err){/*res.end();*/});
			    		//console.log(res.write(""+4)); //El usuario TL existe en la base de datos
			    		check = 1; 
			    		res.end();		
			    	});	

		    	}

		    	if(check != 1){
			    	//Creamos la consulta de buscar el email y pass introducido FAMILIA
			    	let sql_usuPass_fam2 = "SELECT email_TL2, contr_usu_TL2 FROM familia WHERE email_TL2 ='"+em+"' AND contr_usu_TL2='"+contraCifrado+"'";
			    	
			    	db.each(sql_usuPass_fam2, (err, row)=>{
			    		if (err){throw err;}
			    		console.log("TL2");
			    		res.write(""+4);
			    		//console.log(res.write(""+4)); //El usuario TL existe en la base de datos  
			    		check = 1; 	
			    		res.end();	
			    	});	

		    	}
		    	
		    	/*if(check != 1){
		    		res.write(""+5);
		    		//res.end();
		    	}*/

		    	//db.close();
	    	});
	    	
	    }

}

/*
Función para generar una contraseña preliminar
*/
function generatePass(fecha, nombre){
	var criptograma;
	var pass = ""+fecha+nombre.substring(0,1);
	oldPass = pass;

	criptograma = rsa(pass);
	console.log("ESTA ES LA CONTRASENIA: "+criptograma);

	return criptograma;

}
/*
FUNCION QUE DADO UN TEXTO PLANO CIFRA EL CONTENIDO APLICANDO EL ALGORITMO DE RSA
*/
function rsa(pass){	
	/* PASOS:
	1. Convertimos el texto en número, gracias al Código ASCII
	2. Lo ciframos siguiendo el algoritmo de RSA
	3. Devolvemos el valor cifrado
	*/

	//Primer paso: Convertimos el texto en número, gracias al Código ASCII
	var passEncrypted = "";
	for (var i = 0; i< pass.length; i++) {
		passEncrypted = passEncrypted + pass.charCodeAt(i);
	};


	//Segundo paso: Lo ciframos siguiendo el algoritmo de RSA --> BIG NUMBERS !!
	var passPower = 1;
	for (var i = 0; i < e; i++) {
		passPower = BigInt(passPower) * BigInt(passEncrypted);
	};
	
	//Generamos el criptograma siguiendo la fórmula de cifrado de mensaje: C=M^e mod(n)
	var criptograma = BigInt(passPower) % BigInt(n);

	//Devolvemos el texto cifrado
	return criptograma;
}


/*
Función para obtener el DNI del usuario conectado
*/
function getDNI(email,type){
	var dniLocal = "";

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
	    if(err){return console.error(err.message);}

	if(type=="alumno"){
	let sql_DNI = "SELECT DNI_a FROM alumno WHERE email_a ='"+email+"'";
			    
		db.each(sql_DNI, (err, row)=>{
			if (err){throw err;}
				dniLocal = row;	
				dniSave = dniLocal;
				return dniSave;
	    });
	}else if(type=="docente"){
	let sql_DNI = "SELECT DNI_d FROM docente WHERE email_d ='"+email+"'";
			    
		db.each(sql_DNI, (err, row)=>{
			if (err){throw err;}
				dniLocal = row;	
				dniSave = dniLocal;
				return dniSave;
	    });
	}/*else if(){

	}*/
		//db.close();
	});
	dniSave = dniLocal;
	return dniLocal;
}

/*
Función para registrar un nuevo estudiante en la base de datos
*/
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
	        nom_tut = _url.query.nom_tut;
	        ap1_tut = _url.query.ap1_tut;
	        ap2_tut = _url.query.ap2_tut;
	      } catch (e) {
	      }
	    }
	  }

	  //Contraseña generada a partir del nombre y la fecha de nacimiento
	  var con = generatePass(fechaNacimiento, nombre);

	// Introducimos usuario en la BD
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let query_tut1 = "SELECT ID_familia FROM familia WHERE nombre_TL1='"+nom_tut+"' AND apellido1_TL1='"+ap1_tut+"' AND apellido2_TL1='"+ap2_tut+"'";
		db.all(query_tut1, (err, rows)=>{
    		if (err){throw err;}
    		var ID_familia = JSON.stringify(rows).substring(15,16); //Cogemos el ID de familia

		//Creamos la consulta de insertar el nuevo alumno
		let query_insert_alumno = "INSERT INTO alumno (DNI_a, nombre_a, apellido1_a, apellido2_a, fecha_nac_a, email_a, contra_usu_a, ID_familia, ID_curso) VALUES ('"+dni+"','"+nombre+"','"+apellido1+"','"+apellido2+"','"+fechaNacimiento+"','"+email+"','"+con+"','"+ID_familia+"','"+0+"')";
		
		db.run(query_insert_alumno, (err, row)=>{
			if (err){throw err;}
			console.log("Usuario "+nombre+" insertado correctamente.");		
			people="alumno";    		
			dniSave = dni;
	  	});	

		});	
	  	//db.close();
	});
	    
}

/*
Función para registrar un nuevo docente en la base de datos
*/
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
		let query_insert_docente = "INSERT INTO docente (DNI_d, nombre_d, apellido1_d, apellido2_d, fecha_nac_d, email_d, telefono_d, contra_usu_d) VALUES ('"+dni+"','"+nombre+"','"+apellido1+"','"+apellido2+"','"+fechaNacimiento+"','"+email+"',"+telf+",'"+con+"')";
		
		db.run(query_insert_docente, (err, row)=>{
			if (err){throw err;}
			console.log("Usuario "+nombre+" insertado correctamente.");		
			people="docente";    		
			dniSave = dni;
	  	});	

	  	//db.close();
	});
}

/*
Función para registrar una nueva familia en la base de datos
*/
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
	    
	//Contraseña generada a partir del nombre y la fecha de nacimiento
	  var con1 = generatePass(fechaNacimiento, nombre);
	  var con2 = generatePass(fechaNacimiento2, nombre2);

	// Introducimos usuario en la BD
	
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		//Creamos la consulta de insertar el nuevo TL1
		let query_insert_fam = "INSERT INTO familia (nombre_TL1, apellido1_TL1, apellido2_TL1, fecha_nac_TL1, email_TL1, telefono_TL1, DNI_TL1, contr_usu_TL1, nombre_TL2, apellido1_TL2, apellido2_TL2, fecha_nac_TL2, email_TL2, telefono_TL2, DNI_TL2, contr_usu_TL2, calle, portal, piso, mano, ciudad, cp, municipio, pais) VALUES ('"+nombre+"','"+apellido1+"','"+apellido2+"','"+fechaNacimiento+"','"+email+"',"+telf+",'"+dni+"','"+con1+"','"+nombre2+"','"+apellido12+"','"+apellido22+"','"+fechaNacimiento2+"','"+email2+"',"+telf2+",'"+dni2+"','"+con2+"','"+calle+"',"+portal+","+piso+",'"+mano+"','"+ciudad+"',"+cp+",'"+mun+"','"+pais+"')";	
		

		db.run(query_insert_fam, (err, row)=>{
			if (err){throw err;}
			console.log("Usuarios "+nombre+", "+nombre2+" insertados correctamente.");	

	  	});	

	  	//db.close();
	});
	    	
}

/*
Función que se encarga de cambiar la contraseña que se le ha asignado por defecto.
*/
function changePassword(req, res){
	var elDNI="";
	var resul = 0;
	
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        pass = _url.query.pass;
	      } catch (e) {
	      }
	    }
	  }

	  elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	  //Tenemos que cifrar la contraseña
	  var contraCifrado = rsa(pass);

	if(people=="alumno"){
		let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_passUpdate = "UPDATE alumno SET contra_usu_a ='"+contraCifrado+"' WHERE DNI_a ='"+elDNI+"'";
	    	db.run(sql_passUpdate, (err, row)=>{
	    		if (err){throw err;}
	    		res.write(""+"confirmarPassA.html");
	    		//db.close();
	    	});	
	    });
	}else if(people=="docente"){
		let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

			let sql_passUpdate = "UPDATE docente SET contra_usu_d ='"+contraCifrado+"' WHERE DNI_d ='"+elDNI+"'";
		    	db.run(sql_passUpdate, (err, row)=>{
		    		if (err){throw err;}
		    		res.write(""+1);
		    		//db.close();
		    	});	
		});
	}else{
		console.log(people);
	}

}
/*
Recoge toda la información de los alumnos y lo manda al lado del cliente, para que se muestre en MOSTRAR USUARIOS
*/
function matriculaAlumno(req, res){
	arrayAlumnos = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
    	//Creamos la consulta
    	let sql_alumnos = "SELECT nombre_a, apellido1_a, apellido2_a, fecha_nac_a, ID_curso, email_a FROM alumno ORDER BY apellido1_a";
    
    	db.all(sql_alumnos, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayAlumnos.push(row.nombre_a+","+row.apellido1_a+","+row.apellido2_a+","+row.fecha_nac_a+","+row.email_a+","+row.ID_curso);
  			});
  			res.write(""+arrayAlumnos);
    		res.end();
    	});
	}); 	
}

/*
Recoge toda la información de las asignaturas y lo manda al lado del cliente, para que se muestre en MOSTRAR ASIGNATURAS
*/
function mostrarAsig(req, res){
	var elNombre="";
	arrayAsignaturas = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	//Creamos la consulta
    	let sql_asig = "SELECT ID_curso, nombre, DNI_d FROM asignatura ORDER BY nombre";

    	db.all(sql_asig, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayAsignaturas.push(row.ID_curso+","+row.nombre+","+row.DNI_d);
  			});
  			
  			res.write(""+arrayAsignaturas);
  			res.end();
    		
    	});
	}); 	
}

/*
Recoge toda la información de los alumnos cuyo curso sea 0 y lo manda al lado del cliente, para que se muestre en MATRICULAR ALUMNOS
*/
function matriculaAlumnoSinCurso(req, res){
	arrayAlumnos = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
    	//Creamos la consulta
    	let sql_alumnos = "SELECT nombre_a, apellido1_a, apellido2_a, fecha_nac_a, ID_curso, email_a FROM alumno WHERE ID_curso='"+0+"' ORDER BY apellido1_a";
    
    	db.all(sql_alumnos, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayAlumnos.push(row.nombre_a+","+row.apellido1_a+","+row.apellido2_a+","+row.fecha_nac_a+","+row.email_a+","+row.ID_curso);
  			});
  			res.write(""+arrayAlumnos);
    		res.end();
    	});
	}); 	
}
/*
Obtiene la lista de todos los cursos guardados en la base de datos.
*/
function obtenerCursos(req, res){
	arrayCursos = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
    	//Creamos la consulta
    	let sql_cursos = "SELECT ID_curso FROM curso ORDER BY ID_curso";
    
    	db.all(sql_cursos, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayCursos.push(row.ID_curso);
  			});
    		
  			res.write(""+arrayCursos);
    		res.end();
    	});
	});
}

/*
Obtiene la lista de todos los profesores guardados en la base de datos.
*/
function obtenerProfesores(req, res){
	arrayProfes = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
    	//Creamos la consulta
    	let sql_profes = "SELECT nombre_d, apellido1_d, apellido2_d FROM docente ORDER BY nombre_d";
    
    	db.all(sql_profes, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayProfes.push(row.nombre_d+","+row.apellido1_d+","+row.apellido2_d);
  			});
  			res.write(""+arrayProfes);
    		res.end();
    	});
	});
}

/*
Obtiene la lista de todos los tutores 1 guardados en la base de datos.
*/
function obtenerTutores1(req, res){
	arrayTut = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
    	//Creamos la consulta
    	let sql_tut = "SELECT nombre_TL1, apellido1_TL1, apellido2_TL1 FROM familia ORDER BY apellido1_TL1";
    
    	db.all(sql_tut, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayTut.push(row.nombre_TL1+","+row.apellido1_TL1+","+row.apellido2_TL1);
  			});
  			
  			res.write(""+arrayTut);
    		res.end();
    	});
	});
}

/*
Recoge toda la información de los profesores y lo manda al lado del cliente, para que se muestre en MOSTRAR USUARIOS
*/
function matriculaProfesor(req, res){
	arrayProfesores = new Array();

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
    	//Creamos la consulta
    	let sql_profesores = "SELECT nombre_d, apellido1_d, apellido2_d, fecha_nac_d, email_d FROM docente ORDER BY apellido1_d";
    
    	db.all(sql_profesores, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayProfesores.push(row.nombre_d+","+row.apellido1_d+","+row.apellido2_d+","+row.fecha_nac_d+","+row.email_d);
  			});
  			
  			res.write(""+arrayProfesores);
    		res.end();
    	});
	});
}

/*
Recoge toda la información de los tutores y lo manda al lado del cliente, para que se muestre en MOSTRAR USUARIOS
*/
function matriculaTutor(req, res){
	arrayTutores = new Array();

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
    	//Creamos la consulta
    	let sql_tutores = "SELECT nombre_TL1, apellido1_TL1, apellido2_TL1, fecha_nac_TL1, email_TL1, nombre_TL2, apellido1_TL2, apellido2_TL2, fecha_nac_TL2, email_TL2, ID_familia FROM familia ORDER BY apellido1_TL1";
    
    	db.all(sql_tutores, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayTutores.push(row.nombre_TL1+","+row.apellido1_TL1+","+row.apellido2_TL1+","+row.fecha_nac_TL1+","+row.email_TL1+","+row.ID_familia+","+row.nombre_TL2+","+row.apellido1_TL2+","+row.apellido2_TL2+","+row.fecha_nac_TL2+","+row.email_TL2+","+row.ID_familia);
  			});
  			
  			res.write(""+arrayTutores);
    		res.end();
    	});
	});

}
/*
Método que recibe el array de los campos de Matricular alumno y los vuelca a la Base de Datos
*/
function actualizarMatricula(req,res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    arrayActualizado = new Array();
	    if(_url.query) {
	      try {
	        arrayActualizado = _url.query.arrayActualizado; //Array enviado
	      } catch (e) {
	      }
	    }
	  }

	//Separamos los campos por el separador , y lo guardamos en un array
	var arrayDeCadenas = arrayActualizado.split(",");

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		var i = 0;
		while(i<arrayDeCadenas.length){
			//Actualiza únicamente los CURSOS
			let sql_newStudents = "UPDATE alumno SET ID_curso ='"+arrayDeCadenas[i+5]+"' WHERE nombre_a ='"+arrayDeCadenas[i]+"'";
		    	db.run(sql_newStudents, (err, row)=>{
		    		if (err){throw err;}
		    		console.log("Información actualizada");
		    		//db.close();
		    	});
		   	i=i+6;
		}
		console.log(res.write("1"));
		res.end();
	});	
}

//Método para obtener el nombre del alumno
function obtenerNom(req, res){

	//Obtenemos el DNI que se ha guardado anteriormente
	var elDNI = "";

	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	//Generamos una consulta sql para obtener el nombre
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_nom = "SELECT nombre_a FROM alumno WHERE DNI_a ='"+elDNI+"'";
			    	
	    	db.each(sql_nom, (err, row)=>{
	    		if (err){throw err;}
	    		//Enviamos el nombre al front-end
	    		res.write(""+row.nombre_a);
	    		res.end();	
	    	});	
	});	
}

//Método para obtener el nombre del profesor
function obtenerNomP(req, res){

	//Obtenemos el DNI que se ha guardado anteriormente
	var elDNI = "";

	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	//Generamos una consulta sql para obtener el nombre
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_nomP = "SELECT nombre_d FROM docente WHERE DNI_d ='"+elDNI+"'";
			    	
	    	db.each(sql_nomP, (err, row)=>{
	    		if (err){throw err;}
	    		//Enviamos el nombre al front-end
	    		res.write(""+row.nombre_d);
	    		res.end();	
	    	});	
	});	
}

//Método para obtener el curso del alumno
function obtenerCurso(req, res){

	//Obtenemos el DNI que se ha guardado anteriormente
	var elDNI = "";

	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	//Generamos una consulta sql para obtener el nombre
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_nom = "SELECT ID_curso FROM alumno WHERE DNI_a ='"+elDNI+"'";
			    	
	    	db.each(sql_nom, (err, row)=>{
	    		if (err){throw err;}
	    		//Enviamos el nombre al front-end
	    		res.write(""+row.ID_curso);
	    		res.end();	
	    	});	
	});	
}

/*
Método para introducir una nueva asignatura en la base de datos
*/
function introducirAsig(req, res){
	var dniP = "";

	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var curso = "";
	    var nombre = "";
	    var doc_nom = "";
	    var doc_ap1 = "";
	    var doc_ap2 = "";
	    if(_url.query) {
	      try {
	        curso = _url.query.curso; //Curso introducido por el administrador
	        nombre = _url.query.nombre; //Nombre introducida por el administrador
	        doc_nom = _url.query.doc_nom; //Docente nom introducida por el administrador
	        doc_ap1 = _url.query.doc_ap1; //Docente ap1 introducida por el administrador
	        doc_ap2 = _url.query.doc_ap2; //Docente ap2 introducida por el administrador
	      } catch (e) {
	      }
	    }
	  }	

	
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		//Obtenemos el DNI del docente
		let sql_nom = "SELECT DNI_d FROM docente WHERE nombre_d ='"+doc_nom+"' AND apellido1_d='"+doc_ap1+"' AND apellido2_d='"+doc_ap2+"'";
	    	db.each(sql_nom, (err, row)=>{
	    		if (err){throw err;}
	    		//Enviamos el nombre al front-end
	    		dniP = row.DNI_d;
	    		
	    		//Introducimos asignatura en la BD
			    let query_insert_subject = "INSERT INTO asignatura (nombre, DNI_d, ID_curso) VALUES ('"+nombre+"','"+dniP+"','"+curso+"')";
				
				db.run(query_insert_subject, (err, row)=>{
					if (err){throw err;}
					console.log("Asignatura "+nombre+" insertada correctamente.");
					res.write("1");
					res.end();
			  	});

	    	});	
	    });

}

function introducirCurso(req,res){
		if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var curso = "";
	    if(_url.query) {
	      try {
	        curso = _url.query.curso; //Curso introducido por el administrador
	      } catch (e) {
	      }
	    }
	  }	

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

    		//Introducimos curso en la BD
		    let query_insert_course = "INSERT INTO curso (ID_curso) VALUES ('"+curso+"')";
			
			db.run(query_insert_course, (err, row)=>{
				if (err){throw err;}
				console.log("Curso "+curso+" insertado correctamente.");
				res.write("1");
				res.end();
    	});	
    });

}

function obtenerClasesProfesor(req,res){
	arrayClases = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
    	var elDNI = "";

		elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni
		
		//Creamos la consulta
	 	let sql_class = "SELECT ID_curso, nombre FROM asignatura WHERE DNI_d='"+elDNI+"'";

    	db.all(sql_class, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayClases.push(row.ID_curso+" - "+row.nombre+"\n");
  			});
  			res.write(""+arrayClases);
  			res.end();
    		
    	});
	});
}

/*
Recoge toda la información de los alumnos y lo manda al lado del cliente, para que se muestre en MOSTRAR USUARIOS
*/
function matriculaAlumnoConCurso(req, res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var curso = "";
	    if(_url.query) {
	      try {
	        curso = _url.query.curso; //Curso introducido por el usuario
	      } catch (e) {
	      }
	    }
	  }
	var i = 1;
	arrayAlumnos = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
    	//Creamos la consulta
    	let sql_alumnos = "SELECT nombre_a, apellido1_a, apellido2_a, DNI_a, email_a FROM alumno WHERE ID_curso='"+curso+"' ORDER BY apellido1_a";
    
    	db.all(sql_alumnos, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayAlumnos.push(i+","+row.nombre_a+","+row.apellido1_a+","+row.apellido2_a+","+row.DNI_a+","+row.email_a);
    			i=i+1;
  			});
  			
  			res.write(""+arrayAlumnos);
    		res.end();
    	});
	}); 	
}

function introducirActividad(req, res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        asignatura = _url.query.asignatura;
	        curso = _url.query.curso;
	        trimestre = _url.query.trimestre;
	        nombre = _url.query.nombre;
	        peso = _url.query.peso;
	      } catch (e) {
	      }
	    }
	}
	

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_curso = "SELECT ID_asignatura FROM asignatura WHERE nombre='"+asignatura+"' AND ID_curso='"+curso+"'";
    
    	db.all(sql_curso, (err, rows)=>{
    		if (err){throw err;}
    		var codigo = JSON.stringify(rows).substring(18,20); //Cogemos el curso

    		//Introducimos actividad en la BD
		    let query_insert_activity = "INSERT INTO actividad (cod_asig,nombre_act,peso,cod_trimestre) VALUES ('"+codigo+"','"+nombre+"',"+peso+",+"+trimestre+")";
			
			db.run(query_insert_activity, (err, row)=>{
				if (err){throw err;}
				console.log("Actividad insertada correctamente.");
				res.write("1");
				res.end();
    	});	

    	});

    		
    });

}

function mostrarActividades(req, res){
	arrayActiv = new Array();

	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        asignatura = _url.query.asignatura;
	        curso = _url.query.curso;
	      } catch (e) {
	      }
	    }
	}

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_curso = "SELECT ID_asignatura FROM asignatura WHERE nombre='"+asignatura+"' AND ID_curso='"+curso+"'";
    
    	db.all(sql_curso, (err, rows)=>{
    		if (err){throw err;}
    		var codigo = JSON.stringify(rows).substring(18,20); //Cogemos el codigo del curso

    		//Introducimos actividad en la BD
		    let query_act = "SELECT cod_trimestre,nombre_act,peso FROM actividad WHERE cod_asig='"+codigo+"' ORDER BY cod_trimestre";
			
			db.all(query_act, (err, rows)=>{
				if (err){throw err;}
				
				rows.forEach((row) => {
	    			arrayActiv.push(row.cod_trimestre+","+row.nombre_act+","+row.peso*10);
  				});
	  			
	  			res.write(""+arrayActiv);
	    		res.end();
    	});	

    	});

    		
    });

}

function actividadesTrimestre(req, res){
	arrayActiv = new Array();

	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        asignatura = _url.query.asignatura;
	        curso = _url.query.curso;
	        trimestre = _url.query.trimestre;
	      } catch (e) {
	      }
	    }
	}

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_curso = "SELECT ID_asignatura FROM asignatura WHERE nombre='"+asignatura+"' AND ID_curso='"+curso+"'";
    
    	db.all(sql_curso, (err, rows)=>{
    		if (err){throw err;}
    		var codigo = JSON.stringify(rows).substring(18,20); //Cogemos el codigo del curso

    		//Introducimos actividad en la BD
		    let query_act = "SELECT nombre_act,peso FROM actividad WHERE cod_asig='"+codigo+"' AND cod_trimestre='"+trimestre+"'";
			
			db.all(query_act, (err, rows)=>{
				if (err){throw err;}
				
				rows.forEach((row) => {
	    			arrayActiv.push(row.nombre_act+" ("+row.peso*10+"%)");
  				});
	  			
	  			res.write(""+arrayActiv);
	    		res.end();
    	});	

    	});

    		
    });
	
}

function actividadesTrimestreSinPeso(req, res){
	arrayActiv = new Array();

	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        asignatura = _url.query.asignatura;
	        curso = _url.query.curso;
	        trimestre = _url.query.trimestre;
	      } catch (e) {
	      }
	    }
	}

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_curso = "SELECT ID_asignatura FROM asignatura WHERE nombre='"+asignatura+"' AND ID_curso='"+curso+"'";
    
    	db.all(sql_curso, (err, rows)=>{
    		if (err){throw err;}
    		var codigo = JSON.stringify(rows).substring(18,20); //Cogemos el codigo del curso

    		//Introducimos actividad en la BD
		    let query_act = "SELECT nombre_act FROM actividad WHERE cod_asig='"+codigo+"' AND cod_trimestre='"+trimestre+"'";
			
			db.all(query_act, (err, rows)=>{
				if (err){throw err;}
				
				rows.forEach((row) => {
	    			arrayActiv.push(row.nombre_act);
  				});
	  			
	  			res.write(""+arrayActiv);
	    		res.end();
    	});	

    	});

    		
    });
	
}

/*
INFORMACIÓN DE CALIFICACIONES
*/
function calificaciones(req, res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var curso = "";
	    if(_url.query) {
	      try {
	        curso = _url.query.curso; //Curso introducido por el usuario
	        asignatura = _url.query.asignatura; //Asignatura introducido por el usuario
	        trimestre = _url.query.trimestre; //Trimestre introducido por el usuario
	      } catch (e) {
	      }
	    }
	  }
	  
	 //Contamos el número de actividades que hay en el trimestre seleccionado
	arrayCalifs = new Array();
	var k=0;
	
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_a = "SELECT nombre_a, apellido1_a, apellido2_a, calificacion FROM alumno a, evaluacion e, actividad s, asignatura g WHERE a.DNI_a=e.DNI_a AND e.cod_act=s.cod_act AND s.cod_asig=g.ID_asignatura AND g.ID_curso='"+curso+"' AND g.nombre='"+asignatura+"' AND s.cod_trimestre='"+trimestre+"' GROUP BY nombre_a, apellido1_a ORDER BY e.cod_act, a.apellido1_a";
		db.all(sql_a, (err, rows)=>{
			rows.forEach((row) => {
				arrayCalifs.push((k+1)+","+row.nombre_a+" "+row.apellido1_a+" "+row.apellido2_a+", "+row.calificacion);
				k=k+1;	
				
				});
					res.write(""+arrayCalifs);
					res.end();
				

		});
			
			
	});
						
	    					
	
}

/*
Todas las asignaturas del profesor
*/
function mostrarAsigProf(req, res){
	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	arrayAsignaturas = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	//Creamos la consulta
    	let sql_asig = "SELECT nombre FROM asignatura WHERE DNI_d='"+elDNI+"' ORDER BY nombre";

    	db.all(sql_asig, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayAsignaturas.push(row.nombre);
  			});
  			
  			res.write(""+arrayAsignaturas);
  			res.end();
    		
    	});
	}); 	
}

/*
Todas las asignaturas del alumno
*/
function mostrarAsigAlum(req, res){
	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	arrayAsignaturas = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	//Creamos la consulta
    	let sql_asig = "SELECT ID_curso FROM alumno WHERE DNI_a='"+elDNI+"'";

    	db.all(sql_asig, (err, rows)=>{
    		if (err){throw err;}
    		var codigo = JSON.stringify(rows).substring(14,19); //Cogemos el codigo del curso

    		let sql_asig2 = "SELECT nombre FROM asignatura WHERE ID_curso='"+codigo+"' ORDER BY nombre";

				db.all(sql_asig2, (err, rows)=>{
	    		rows.forEach((row) => {
	    			arrayAsignaturas.push(row.nombre);
	  			});
  			
  			res.write(""+arrayAsignaturas);
  			res.end();
  			});
    		
    	});
	}); 	
}

/*
Todos los alumnos del profesor
*/
function mostrarAlumnosProf(req, res){
	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	arrayAlumnos = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	//Creamos la consulta
    	let sql_a = "SELECT nombre_a, apellido1_a, apellido2_a FROM alumno a, curso c, asignatura g WHERE a.ID_curso = c.ID_curso AND c.ID_curso=g.ID_curso AND g.DNI_d='"+elDNI+"'";

    	db.all(sql_a, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayAlumnos.push(row.nombre_a+" "+row.apellido1_a+" "+row.apellido2_a);
  			});
  			
  			res.write(""+arrayAlumnos);
  			res.end();
    		
    	});
	}); 	
}

/*
Todas las actividades del profesor
*/
function mostrarActivProf(req, res){
	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	arrayActivs = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	//Creamos la consulta
    	let sql_a = "SELECT nombre_act FROM actividad a, asignatura g WHERE a.cod_asig = g.ID_asignatura AND g.DNI_d='"+elDNI+"'";

    	db.all(sql_a, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayActivs.push(row.nombre);
  			});
  			
  			res.write(""+arrayActivs);
  			res.end();
    		
    	});
	}); 	
}

/*
El número de incidencias hechas por el profesor
*/
function mostrarIncidProf(req, res){
	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	arrayIncid = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	//Creamos la consulta
    	let sql_a = "SELECT fecha FROM incidencia WHERE DNI_p='"+elDNI+"'";

    	db.all(sql_a, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayIncid.push(row.fecha);	
  			});

			res.write(""+arrayIncid);
  			res.end();
    		
    	});
	}); 	
}

/*
El número de incidencias hechas por el alumno
*/
function mostrarIncidAlum(req, res){
	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	arrayIncid = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	//Creamos la consulta
    	let sql_a = "SELECT fecha FROM incidencia WHERE DNI_a='"+elDNI+"'";

    	db.all(sql_a, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayIncid.push(row.fecha);	
  			});

			res.write(""+arrayIncid);
  			res.end();
    		
    	});
	}); 	
}

function guardarIncidencia(req, res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var mail = 0;
	    if(_url.query) {
	      try {
	        asignatura = _url.query.asignatura;
	        nombre = _url.query.nombre;
	        apellido1 = _url.query.apellido1;
	        apellido2 = _url.query.apellido2;
	        fecha = _url.query.fecha;
	        concepto = _url.query.concepto;
	      } catch (e) {
	      }
	    }
	}

	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		let sql_alum = "SELECT DNI_a FROM alumno WHERE nombre_a='"+nombre+"' AND apellido1_a='"+apellido1+"' AND apellido2_a='"+apellido2+"'";
    
    	db.all(sql_alum, (err, rows)=>{
    		if (err){throw err;}
    		var dni_Alumno = JSON.stringify(rows).substring(11,20); //Cogemos el dni del alumno

    		//Introducimos actividad en la BD
		    let query_insert_activity = "INSERT INTO incidencia (DNI_a,DNI_p,fecha,asignatura,asunto) VALUES ('"+dni_Alumno+"','"+elDNI+"','"+fecha+"','"+asignatura+"','"+concepto+"')";
			
			db.run(query_insert_activity, (err, row)=>{
				if (err){throw err;}
				console.log("incidencia insertada correctamente.");
				res.write("1");
				res.end();
    	});	

    	

    		
    	});
   	});

}

/*
Las incidencias del profesor detalladas
*/
function obtenerIncidencias(req,res){
	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni
	var i=1;

	arrayIncid = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	//Creamos la consulta
    	let sql_a = "SELECT DNI_a,fecha,asignatura,asunto FROM incidencia WHERE DNI_p='"+elDNI+"' ORDER BY fecha";

    	db.all(sql_a, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayIncid.push(i+", "+row.asignatura+", "+row.fecha+", "+row.DNI_a+", "+row.asunto);
    			i=i+1;
  			});

			res.write(""+arrayIncid);
  			res.end();
    		
    	});
	});
}

/*
Las incidencias del alumno detalladas
*/
function obtenerIncidenciasAlum(req,res){
	elDNI = JSON.stringify(dniSave).substring(10,19); //Cogemos el dni
	var i=1;

	arrayIncid = new Array();
	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	//Creamos la consulta
    	let sql_a = "SELECT fecha,asignatura,asunto FROM incidencia WHERE DNI_a='"+elDNI+"' ORDER BY fecha";

    	db.all(sql_a, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			arrayIncid.push(i+", "+row.asignatura+", "+row.fecha+", "+row.asunto);
    			i=i+1;
  			});

			res.write(""+arrayIncid);
  			res.end();
    		
    	});
	});
}

function calif(req,res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var curso = "";
	    if(_url.query) {
	      try {
	        curso = _url.query.curso; //Curso introducido por el docente
	        asignatura = _url.query.asignatura; //Asignatura introducido por el docente
	        actividad = _url.query.actividad; //Actividad introducida por el docente
	        trimestre = _url.query.trimestre; //Trimestre
	      } catch (e) {
	      }
	    }
	  }

	var k=1;
	var indiceNotas = 0;
	var b = 0;
	var blanco = " ";
	arrayDNIs = new Array();
	arrayID = new Array();
	arrayNoms = new Array();
	arrayApe1s = new Array();
	arrayApe2s = new Array();
	arrayFinal = new Array();
	arrayNotas = new Array();
	arrayCodigoActiv = new Array();

	 let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}
    	
		//Codigo actividad
    	let sql_a1 = "SELECT cod_act FROM actividad WHERE nombre_act='"+actividad+"' AND cod_trimestre='"+trimestre+"'";

    	db.all(sql_a1, (err, rows)=>{
    		if (err){throw err;}
    		
    		rows.forEach((row) => {
    			arrayCodigoActiv.push(row.cod_act); //El codigo de la actividad actual
  			});	
  		console.log(arrayCodigoActiv);

    	//Aquí tenemos todos los usuarios YA calificados
    	let sql_a1 = "SELECT e.DNI_a,a.cod_act FROM actividad a, evaluacion e, alumno l WHERE a.cod_act=e.cod_act AND e.DNI_a=l.DNI_a AND a.nombre_act='"+actividad+"' ORDER BY l.apellido1_a";

    	db.all(sql_a1, (err, rows)=>{
    		if (err){throw err;}
    		
    		rows.forEach((row) => {
    			arrayDNIs.push(row.DNI_a); //Los DNIs que tienen calificación en la actividad actual
  			});		

    		//Todos los usuarios

    		let sql_a = "SELECT nombre_a,apellido1_a,apellido2_a,DNI_a FROM alumno WHERE ID_curso='"+curso+"' ORDER BY apellido1_a";

	    	db.all(sql_a, (err, rows)=>{
	    		if (err){throw err;}
	    		
	    		rows.forEach((row) => {
	    			arrayID.push(row.DNI_a);
	    			arrayNoms.push(row.nombre_a);
	    			arrayApe1s.push(row.apellido1_a);
	    			arrayApe2s.push(row.apellido2_a);
	  			});

	  			var ac = arrayCodigoActiv[0];

	  			let sql_b = "SELECT calificacion FROM alumno a, evaluacion e WHERE a.DNI_a = e.DNI_a AND e.cod_act="+ac+" ORDER BY a.apellido1_a";

	  			db.all(sql_b, (err, rows)=>{
	  				if (err){throw err;}
	  				rows.forEach((row) => {
		    			arrayNotas.push(row.calificacion);
	  				});

	  			var w = 0;
	  			var c = 0;
	    			for (var i = 0; i < arrayID.length; i++) {
	    				
	    				for (var j = 0; j < arrayDNIs.length; j++) {
	    					c = 1;
	    					if(arrayID[i]==arrayDNIs[j]){ //Esto significa que ya tiene una calificación

	    						arrayFinal.push(k+", "+arrayNoms[i]+" "+arrayApe1s[i]+" "+arrayApe2s[i]+", "+arrayNotas[indiceNotas]);
	    						indiceNotas = indiceNotas+1;
	    						k=k+1;
	    						j = arrayDNIs.length+1;
	    						w=1;
	    					}
	    					if((j == arrayDNIs.length-1) && (w==0)){
	    						
								arrayFinal.push(k+", "+arrayNoms[i]+" "+arrayApe1s[i]+" "+arrayApe2s[i]+","+"\u00a0");
	    						k=k+1;
	    					}
	    					w=0;
	    					
	    				};
	    				if(c==0){ //Si la tabla está vacía la cargamos con los nombres
							for (var i = 0; i < arrayID.length; i++) {
								arrayFinal.push(k+", "+arrayNoms[i]+" "+arrayApe1s[i]+" "+arrayApe2s[i]+","+"\u00a0");
								k=k+1;
							}
	    				}
	    				
	    			};
	    		res.write(""+arrayFinal);
	    		res.end();

	  			});
	    	});
    		
    	});

	});

    	
	});


}

/*
Método que recibe el array de los campos de notas alumno y los vuelca a la Base de Datos
*/
function actualizarNotas(req,res){
	if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    arrayActualizado = new Array();
	    if(_url.query) {
	      try {
	      	curso = _url.query.curso; //Curso introducido por el docente
	        asignatura = _url.query.asignatura; //Asignatura introducido por el docente
	        actividad = _url.query.actividad; //Actividad introducida por el docente
	        arrayActualizado = _url.query.arrayActualizado; //Array enviado
	        trimestre = _url.query.trimestre; //Trimestre
	      } catch (e) {
	      }
	    }
	  }

	var indiceAlumno = 0;

	//Separamos los campos por el separador , y lo guardamos en un array
	var arrayDeCadenas = arrayActualizado.split(",");

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}

		//Codigo actividad
    	let sql_a1 = "SELECT cod_act FROM actividad WHERE nombre_act='"+actividad+"' AND cod_trimestre='"+trimestre+"'";

    	db.all(sql_a1, (err, rows)=>{
    		if (err){throw err;}
    		
    		rows.forEach((row) => {
    			arrayCodigoActiv.push(row.cod_act); //El codigo de la actividad actual
  			});	

    	var ac = arrayCodigoActiv[0];

    	//Cogemos los alumnos
    	let sql_a = "SELECT nombre_a,apellido1_a,apellido2_a,DNI_a FROM alumno WHERE ID_curso='"+curso+"' ORDER BY apellido1_a";

	    	db.all(sql_a, (err, rows)=>{
	    		if (err){throw err;}
	    		
	    		rows.forEach((row) => {
	    			arrayID.push(row.DNI_a);
	    			arrayNoms.push(row.nombre_a);
	    			arrayApe1s.push(row.apellido1_a);
	    			arrayApe2s.push(row.apellido2_a);
	  			});



		var i = 0;
		
		//Eliminamos completamente la tabla de la base de datos y la volvemos a cargar
		let query_drop_evaluacion = "DELETE FROM evaluacion WHERE cod_act='"+ac+"'";
		db.run(query_drop_evaluacion, (err, row)=>{
				if (err){throw err;}
		  	});

		while(i<arrayDeCadenas.length){
			var eld = arrayID[indiceAlumno];

			let query_insert_results = "INSERT INTO evaluacion (DNI_a, cod_act, calificacion) VALUES ('"+eld+"','"+ac+"','"+arrayDeCadenas[i+2]+"')";
		
			db.run(query_insert_results, (err, row)=>{
				if (err){throw err;}
		  	});	

		   	i=i+3;
		   	indiceAlumno = indiceAlumno +1;
		}
		console.log(res.write("1"));
		res.end();
		});	
    });
    });	
}

function verNotas(req,res){
		if (req.url != undefined) {
	    var _url = url.parse(req.url, true);
	    var pathname = _url.pathname;
	    var curso = "";
	    if(_url.query) {
	      try {
	        curso = _url.query.curso; //Curso introducido por el docente
	        asignatura = _url.query.asignatura; //Asignatura introducido por el docente
	        trimestre = _url.query.trimestre;
	        actividades = _url.query.actividades; //Array de actividades
	      } catch (e) {
	      }
	    }
	  }

	 
	var codi =0;
	arrayActivCodigo = new Array();

	arrayDNIs = new Array();
	arrayID = new Array();
	arrayNoms = new Array();
	arrayApe1s = new Array();
	arrayApe2s = new Array();
	arrayFinal = new Array();
	arrayNotas = new Array();
	arrayCodigoActiv = new Array();
	var k=1;
	var indiceNotas = 0;
	numAsigCalif = new Array();
	arrayFinal = [];

	let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err)=>{
		if(err){return console.error(err.message);}



		//Codigo asignatura
    	let sql_a1 = "SELECT ID_asignatura FROM asignatura WHERE nombre='"+asignatura+"' AND ID_curso='"+curso+"'";

    	db.all(sql_a1, (err, rows)=>{
    		if (err){throw err;}

    		rows.forEach((row) => {
    			codi = row.ID_asignatura;
  			});

    		let sql_a = "SELECT nombre_a,apellido1_a,apellido2_a,DNI_a FROM alumno WHERE ID_curso='"+curso+"' ORDER BY apellido1_a";

			    db.all(sql_a, (err, rows)=>{
		    		if (err){throw err;}
		    		
		    		rows.forEach((row) => {
		    			arrayID.push(row.DNI_a);
		    			arrayNoms.push(row.nombre_a);
		    			arrayApe1s.push(row.apellido1_a);
		    			arrayApe2s.push(row.apellido2_a);
		  			});

    				let sql_a2 = "SELECT cod_act FROM actividad WHERE cod_asig='"+codi+"' AND cod_trimestre='"+trimestre+"' ORDER BY cod_act";

					db.all(sql_a2, (err, rows)=>{
	    			if (err){throw err;}

		    		rows.forEach((row) => {
						arrayActivCodigo.push(row.cod_act);
			  		});


		    		let sql_a3 = "SELECT calificacion, e.cod_act FROM evaluacion e, actividad a, alumno l WHERE e.cod_act=a.cod_act AND e.DNI_a=l.DNI_a AND a.cod_asig='"+codi+"' AND a.cod_trimestre='"+trimestre+"' ORDER BY l.apellido1_a, a.cod_asig, e.cod_act";
					db.all(sql_a3, (err, rows)=>{
	    			if (err){throw err;}
		    			rows.forEach((row) => {
							arrayNotas.push(row.calificacion);
							numAsigCalif.push(row.cod_act);
				  		});

				  		var numFin = (numAsigCalif.length)/(arrayNoms.length);


				  		//Si todas las actividades están calificadas - PROCESO DIRECTO
				  		if(numFin == arrayActivCodigo.length && arrayNotas.length!=0){
					  		for (var i = 0; i < arrayID.length; i++) {
					  			arrayFinal.push((i+1)+","+arrayNoms[i]+" "+arrayApe1s[i]+" "+arrayApe2s[i]);
						  			for (var j = 0; j < numFin; j++) {
			    						arrayFinal.push(arrayNotas[indiceNotas]);
			    						indiceNotas= indiceNotas+1;
			    					};
		    				};
	    				}else if(arrayNotas.length!=0){
	    					indiceNotas =0;

	    					for (var i = 0; i < arrayID.length; i++) {
	    						arrayFinal.push((i+1)+","+arrayNoms[i]+" "+arrayApe1s[i]+" "+arrayApe2s[i]);
	    						//AGREGAR CALIFICACIONES
	    						for (var a = 0; a < arrayActivCodigo.length; a++) { //Total actividades trimestre
	    							for (var b = 0; b < numAsigCalif.length; b++) { //Total actividades calificadas
	    									if (arrayActivCodigo[a]==numAsigCalif[b]) {
					    						arrayFinal.push(arrayNotas[indiceNotas]);
					    						indiceNotas= indiceNotas+1;
					    						b=numAsigCalif;
	    									}else if(a==b){
	    										arrayFinal.push("\u00a0");
	    										b=numAsigCalif;
	    									}
	    							}
	    						};
	    					};


	    				}
						res.write(""+arrayFinal);
						res.end();
	    			});

	  			});
			
			
			//arrayActivCodigo = actividadesCodigo(actividades, codi,trimestre); 
			//console.log(arrayActivCodigo);
			});
    	});	
	
	});		  
}

