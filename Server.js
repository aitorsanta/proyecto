var controller = require("./controller");
var urlResponseHandlers = require("./urlResponseHandlers");
let port = process.env.PORT;
var pg = require("pg");

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
	controller.dispatch(urlResponseHandlers.loginApp, req, res);
});

app.get('/introNewStudent', function(req, res) {
	controller.dispatch(urlResponseHandlers.introNewStudent, req, res);
});

app.get('/introNewTeacher', function(req, res) {
	controller.dispatch(urlResponseHandlers.introNewTeacher, req, res);
});

app.get('/introNewFamily', function(req, res) {
	controller.dispatch(urlResponseHandlers.introNewFamily, req, res);
});

app.get('/changePassword', function(req, res) {
	controller.dispatch(urlResponseHandlers.changePassword, req, res);
});

app.get('/matriculaAlumno', function(req, res) {
	controller.dispatch(urlResponseHandlers.matriculaAlumno, req, res);
});

app.get('/obtenerCursos', function(req, res) {	
	controller.dispatch(urlResponseHandlers.obtenerCursos, req, res);
});

app.get('/matriculaProfesor', function(req, res) {
	controller.dispatch(urlResponseHandlers.matriculaProfesor, req, res);
});

app.get('/matriculaTutor', function(req, res) {
	controller.dispatch(urlResponseHandlers.matriculaTutor, req, res);
});

app.get('/matriculaAlumnoSinCurso', function(req, res) {
	controller.dispatch(urlResponseHandlers.matriculaAlumnoSinCurso, req, res);
});

app.get('/actualizarMatricula', function(req, res) {
	controller.dispatch(urlResponseHandlers.actualizarMatricula, req, res);
});

app.get('/obtenerNom', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerNom, req, res);
});

app.get('/obtenerNomP', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerNomP, req, res);
});

app.get('/obtenerCurso', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerCurso, req, res);
});

app.get('/obtenerProfesores', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerProfesores, req, res);
});

app.get('/introducirAsig', function(req, res) {
	controller.dispatch(urlResponseHandlers.introducirAsig, req, res);
});

app.get('/introducirCurso', function(req, res) {
	controller.dispatch(urlResponseHandlers.introducirCurso, req, res);
});

app.get('/mostrarAsig', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarAsig, req, res);
});

app.get('/obtenerClasesProfesor', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerClasesProfesor, req, res);
});

app.get('/matriculaAlumnoConCurso', function(req, res) {
	controller.dispatch(urlResponseHandlers.matriculaAlumnoConCurso, req, res);
});

app.get('/introducirActividad', function(req, res) {
	controller.dispatch(urlResponseHandlers.introducirActividad, req, res);
});

app.get('/mostrarActividades', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarActividades, req, res);
});

app.get('/actividadesTrimestre', function(req, res) {
	controller.dispatch(urlResponseHandlers.actividadesTrimestre, req, res);
});

app.get('/actividadesTrimestreSinPeso', function(req, res) {
	controller.dispatch(urlResponseHandlers.actividadesTrimestreSinPeso, req, res);
});

app.get('/calificaciones', function(req, res) {
	controller.dispatch(urlResponseHandlers.calificaciones, req, res);
});

app.get('/mostrarAsigProf', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarAsigProf, req, res);
});

app.get('/mostrarAlumnosProf', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarAlumnosProf, req, res);
});

app.get('/mostrarActivProf', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarActivProf, req, res);
});

app.get('/mostrarIncidProf', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarIncidProf, req, res);
});

app.get('/guardarIncidencia', function(req, res) {
	controller.dispatch(urlResponseHandlers.guardarIncidencia, req, res);
});

app.get('/obtenerIncidencias', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerIncidencias, req, res);
});

app.get('/mostrarAsigAlum', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarAsigAlum, req, res);
});

app.get('/mostrarIncidAlum', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarIncidAlum, req, res);
});

app.get('/obtenerIncidenciasAlum', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerIncidenciasAlum, req, res);
});

app.get('/obtenerTutores1', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerTutores1, req, res);
});

app.get('/calif', function(req, res) {
	controller.dispatch(urlResponseHandlers.calif, req, res);
});

app.get('/actualizarNotas', function(req, res) {
	controller.dispatch(urlResponseHandlers.actualizarNotas, req, res);
});

app.get('/verNotas', function(req, res) {
	controller.dispatch(urlResponseHandlers.verNotas, req, res);
});

app.get('/pesar', function(req, res) {
	controller.dispatch(urlResponseHandlers.pesar, req, res);
});

app.get('/verNotasAlum', function(req, res) {
	controller.dispatch(urlResponseHandlers.verNotasAlum, req, res);
});

app.get('/matriculaAlumnoTL', function(req, res) {
	controller.dispatch(urlResponseHandlers.matriculaAlumnoTL, req, res);
});

app.get('/totalHijos', function(req, res) {
	controller.dispatch(urlResponseHandlers.totalHijos, req, res);
});

app.get('/mostrarAsigAlumTl', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarAsigAlumTl, req, res);
});

app.get('/verNotasAlumTL', function(req, res) {
	controller.dispatch(urlResponseHandlers.verNotasAlumTL, req, res);
});

app.get('/obtenerNomTL', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerNomTL, req, res);
});

app.get('/obtenerIncidenciasAlumTl', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerIncidenciasAlumTl, req, res);
});

app.get('/mostrarAsigTodas', function(req, res) {
	controller.dispatch(urlResponseHandlers.mostrarAsigTodas, req, res);
});

app.get('/actualizarProfesor', function(req, res) {
	controller.dispatch(urlResponseHandlers.actualizarProfesor, req, res);
});

app.get('/comprobarContrasenia', function(req, res) {
	controller.dispatch(urlResponseHandlers.comprobarContrasenia, req, res);
});

app.get('/actualizarAlumnoTot', function(req, res) {
	controller.dispatch(urlResponseHandlers.actualizarAlumnoTot, req, res);
});

app.get('/actualizarDocenteTot', function(req, res) {
	controller.dispatch(urlResponseHandlers.actualizarDocenteTot, req, res);
});

app.get('/actualizarTutorTot', function(req, res) {
	controller.dispatch(urlResponseHandlers.actualizarTutorTot, req, res);
});

app.get('/obtenerAlumnos', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerAlumnos, req, res);
});

app.get('/obtenerTutores', function(req, res) {
	controller.dispatch(urlResponseHandlers.obtenerTutores, req, res);
});

app.get('/eliminarUsuario', function(req, res) {
	controller.dispatch(urlResponseHandlers.eliminarUsuario, req, res);
});

app.listen(port, () => {console.log(`Proyecto fin de grado en marcha: port ${port}!`)})