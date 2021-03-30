import commonPartial from './partials.js';
import auth from './auth.js';
export default {
    getHome: function(ctx){
        auth.setHeader(ctx);
        console.log(ctx.isAuth, ctx.user);
        ctx.loadPartials(commonPartial).partial('./view/home.hbs');
    }
}