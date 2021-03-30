import { create, get } from '../models/events.js';
import auth from './auth.js';
import commonPartial from './partials.js';
export default {
    getAdd: function(ctx) {
        auth.setHeader(ctx);
        ctx.loadPartials(commonPartial).partial('./view/movies/add.hbs');
    },
    postAdd: function(ctx) {
        const {title, description, imageURL} = ctx.params;
        create({title, description, imageURL, creator: ctx.user, likes: {}})
        .then(() => {
            ctx.redirect('#/home');
        })
        .catch(e => console.log(e));
    },
    getDetails: function(ctx) {
        const id = ctx.params.id;
        auth.setHeader(ctx);
        get(id)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }
}