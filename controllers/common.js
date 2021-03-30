import commonPartial from './partials.js';
import auth from './auth.js';
import { getAll } from '../models/events.js';
export default {
    getHome: function(ctx){
        auth.setHeader(ctx);
        getAll()
        .then(res => {
            const movies = res.docs.map(x => x=  {...x.data(), id: x.id });
            ctx.movies = movies;
            ctx.loadPartials(commonPartial).partial('./view/home.hbs');
        })
        .catch(e => console.log(e));
    }
}