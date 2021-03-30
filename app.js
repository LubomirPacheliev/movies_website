import common from './controllers/common.js';
import user from './controllers/user.js';
import movies from './controllers/movies.js';

(function() {
    const app = Sammy("body", function () {
        this.use("Handlebars", "hbs");
    
        this.get('#/home', common.getHome);
        this.get('#/register', user.getRegister);
        this.get('#/logout', user.getLogout);
        this.get('#/login', user.getLogin);
        this.get('#/add', movies.getAdd);
        this.get('#/details/:id', movies.getDetails);
    
        this.post('#/register', user.postRegister);
        this.post('#/login', user.postLogin);
        this.post('#/add', movies.postAdd);
    }); 
    app.run('#/home');
})();