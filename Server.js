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
app.listen(port, () => {console.log(`Proyecto fin de grado en marcha: port ${port}!`)})