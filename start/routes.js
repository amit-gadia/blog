'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/
const Database=use('Database')

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const a={
    code:""
}
Route.on('/').render('layouts.fp',{a})
Route.get('/visible',async({view})=>{
    const abc= await Database.select('*').from('blog').where('flag','show')
    return view.render('layouts.showvisiblepost',{abc})
})
Route.get('/hide',async({view})=>{
    const abc= await Database.select('*').from('blog').where('flag','hide')
    return view.render('layouts.showhidepost',{abc})
})
Route.on('/post/new').render('layouts.create_new_post')
Route.post('/ami',async({request, response,view})=>{
    const term = request.all()
    if(term.val==undefined){
    const abc= await Database.table('blog').insert({title:term.title,content:term.blog_data,flag:'hide'})
    const a={
        code:'<div class="alert alert-dismissible alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>New Blog Add Successfully in Draft</strong></div>'
    }
    return view.render('layouts.fp',{a})
    }
    else{
    const abc= await Database.table('blog').insert({title:term.title,content:term.blog_data,flag:'show'})
    const a={
        code:'<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>New Blog Add Successfully in Visible Mode</strong></div>'
    }
    return view.render('layouts.fp',{a})
    }
})
Route.post('/editview',async({request, response,view})=>{
    const term = request.all()
    if(term.val==undefined){
        const abc= await Database.table('blog').where({id:term.id}).update({title:term.title,content:term.blog_data,flag:'hide'})
        const a={
            code:'<div class="alert alert-dismissible alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Updated Blog</strong></div>'
        }
        return view.render('layouts.fp',{a})
    }
    else{
        const abc= await Database.table('blog').where({id:term.id}).update({title:term.title,content:term.blog_data,flag:'show'})
        const a={
            code:'<div class="alert alert-dismissible alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Updated Blog</strong></div>'
        }
        return view.render('layouts.fp',{a})
    }
    
})

Route.get('/del/:id',async({params,view})=>{

    const abc= await Database.delete('id').from('blog').where('id',params.id)
    const a={
        code:'<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong> Blog Deleted </strong></div>'
    }
    return view.render('layouts.fp',{a})
})

Route.get('/visible/:id',async({params,view})=>{

    const abc= await Database.table('blog').where({id:params.id}).update({flag:'show'})
    const a={
        code:'<div class="alert alert-dismissible alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button><strong> Hide to Visible Blog</strong></div>'
    }
    return view.render('layouts.fp',{a})
})
Route.get('/hide/:id',async({params,view})=>{

    const abc= await Database.table('blog').where({id:params.id}).update({flag:'hide'})
    const a={
        code:'<div class="alert alert-dismissible alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button><strong> Visible To Hide Blog</strong></div>'
    }
    return view.render('layouts.fp',{a})
})
Route.get('/edit/:id',async({params,view})=>{

    const abc= await Database.select('*').from('blog').where('id',params.id)
    return view.render('layouts.edit',{abc})
})

Route.get('/posts/:id',async({params,view}) => {
    const abc= await Database.select('*').from('blog').where('id',params.id)
    console.log(abc)
    return view.render('layouts.showpostid',{abc})
})

