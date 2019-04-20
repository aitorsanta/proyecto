var controller = require("./controller");
var urlResponseHandlers = require("./urlResponseHandlers");
let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}


// Load the express library, which we installed using npm
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
	res.redirect("pages/login.html");
});

app.get('/loginApp', function(req, res) {
	console.log("Login method");
	controller.dispatch(urlResponseHandlers.loginApp, req, res);
});

app.get('/introNewStudent', function(req, res) {
	console.log("Introducing student in the DB");
	controller.dispatch(urlResponseHandlers.introNewStudent, req, res);
});

app.get('/introNewTeacher', function(req, res) {
	console.log("Introducing teacher in the DB");
	controller.dispatch(urlResponseHandlers.introNewTeacher, req, res);
});

app.get('/introNewFamily', function(req, res) {
	console.log("Introducing family in the DB");
	controller.dispatch(urlResponseHandlers.introNewFamily, req, res);
});

app.get('/changePassword', function(req, res) {
	console.log("Changing password");
	controller.dispatch(urlResponseHandlers.changePassword, req, res);
});

app.get('/matriculaAlumno', function(req, res) {
	console.log("Obteniendo datos de los alumnos de la BD");
	controller.dispatch(urlResponseHandlers.matriculaAlumno, req, res);
});

app.get('/obtenerCursos', function(req, res) {
	console.log("Obteniendo todos los cursos disponibles");
	controller.dispatch(urlResponseHandlers.obtenerCursos, req, res);
});

app.get('/matriculaProfesor', function(req, res) {
	console.log("Obteniendo todos los profesores");
	controller.dispatch(urlResponseHandlers.matriculaProfesor, req, res);
});

app.get('/matriculaTutor', function(req, res) {
	console.log("Obteniendo todos los tutores legales");
	controller.dispatch(urlResponseHandlers.matriculaTutor, req, res);
});

app.get('/matriculaAlumnoSinCurso', function(req, res) {
	console.log("Obteniendo todos los alumnos sin curso");
	controller.dispatch(urlResponseHandlers.matriculaAlumnoSinCurso, req, res);
});

app.get('/actualizarMatricula', function(req, res) {
	console.log("Actualizando matrícula");
	controller.dispatch(urlResponseHandlers.actualizarMatricula, req, res);
});

app.get('/obtenerNom', function(req, res) {
	//console.log("Obteniendo el nombre del alumno");
	controller.dispatch(urlResponseHandlers.obtenerNom, req, res);
});

app.get('/obtenerNomP', function(req, res) {
	//console.log("Obteniendo el nombre del profesor");
	controller.dispatch(urlResponseHandlers.obtenerNomP, req, res);
});

app.get('/obtenerCurso', function(req, res) {
	//console.log("Obteniendo el curso");
	controller.dispatch(urlResponseHandlers.obtenerCurso, req, res);
});

app.get('/obtenerProfesores', function(req, res) {
	//console.log("Obteniendo los profesores");
	controller.dispatch(urlResponseHandlers.obtenerProfesores, req, res);
});

app.get('/introducirAsig', function(req, res) {
	console.log("Introduciendo nueva asignatura");
	controller.dispatch(urlResponseHandlers.introducirAsig, req, res);
});

app.get('/introducirCurso', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.introducirCurso, req, res);
});

app.get('/mostrarAsig', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.mostrarAsig, req, res);
});

app.get('/obtenerClasesProfesor', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.obtenerClasesProfesor, req, res);
});

app.get('/matriculaAlumnoConCurso', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.matriculaAlumnoConCurso, req, res);
});

app.get('/introducirActividad', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.introducirActividad, req, res);
});

app.get('/mostrarActividades', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.mostrarActividades, req, res);
});

app.get('/actividadesTrimestre', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.actividadesTrimestre, req, res);
});

app.get('/actividadesTrimestreSinPeso', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.actividadesTrimestreSinPeso, req, res);
});

app.get('/calificaciones', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.calificaciones, req, res);
});

app.get('/mostrarAsigProf', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.mostrarAsigProf, req, res);
});

app.get('/mostrarAlumnosProf', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.mostrarAlumnosProf, req, res);
});

app.get('/mostrarActivProf', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.mostrarActivProf, req, res);
});

app.get('/mostrarIncidProf', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.mostrarIncidProf, req, res);
});

app.get('/guardarIncidencia', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.guardarIncidencia, req, res);
});

app.get('/obtenerIncidencias', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.obtenerIncidencias, req, res);
});

app.get('/mostrarAsigAlum', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.mostrarAsigAlum, req, res);
});

app.get('/mostrarIncidAlum', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.mostrarIncidAlum, req, res);
});

app.get('/obtenerIncidenciasAlum', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.obtenerIncidenciasAlum, req, res);
});

app.get('/obtenerTutores1', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.obtenerTutores1, req, res);
});

app.get('/calif', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.calif, req, res);
});

app.get('/actualizarNotas', function(req, res) {
	//console.log("Introduciendo nuevo curso");
	controller.dispatch(urlResponseHandlers.actualizarNotas, req, res);
});

app.listen(port, () => {console.log(`Proyecto fin de grado en marcha: port ${port}!`)})