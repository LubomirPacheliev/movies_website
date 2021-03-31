import { create, get, update, close } from '../models/events.js';
import auth from './auth.js';
import commonPartial from './partials.js';
export default {
    getAdd: function(ctx) {
        auth.setHeader(ctx);
        ctx.loadPartials(commonPartial).partial('./view/movies/add.hbs');
    },
    postAdd: function(ctx) {
        const {title, description, imageURL} = ctx.params;
        const [creator, likes] = [sessionStorage.getItem('user'), {}]; 
        create({title, description, imageURL, creator, likes})
        .then(() => {
            ctx.redirect('#/home');
        })
        .catch(e => console.log(e));
    },
    getDetails: function(ctx) {
        const id = ctx.params.id;
        auth.setHeader(ctx);
        get(id)
        .then(res => res.data())
        .then(data => {
            const currMovie = data;
            ctx.isCreator = currMovie.creator === sessionStorage.getItem('user');
            ctx.currMovie = currMovie;
            ctx.loadPartials(commonPartial).partial('./view/movies/details.hbs');
        })
        .catch(e => console.log(e));
    },
    getEdit: function(ctx) {
        const id = ctx.params.id;
        auth.setHeader(ctx);
        get(id)
        .then(res => {
            ctx.currMovie = res.data();
            ctx.loadPartials(commonPartial).partial('./view/movies/edit.hbs');
        })
        .catch(e => console.log(e));
    },
    postEdit: function(ctx) {
        const id = ctx.params.id;
        const {title, description, imageURL} = ctx.params;
        update(id, {title, description, imageURL})
        .then(() => ctx.redirect('#/home'))
        .catch(e => console.log(e));
    },
    getDelete: function(ctx) {
        const id = ctx.params.id;
        close(id)
        .then(() => ctx.redirect('#/home'))
        .catch(e => console.log(e));
    }
}