var url = require("url");


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
}