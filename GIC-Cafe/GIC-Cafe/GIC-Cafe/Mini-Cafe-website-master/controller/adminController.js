const UserComment = require('../models/userCommentModel');
const addPizza= require('../models/addPizza.model');
const Order = require('../models/order');
const Booking= require('../models/booking')
const chats= require('../models/Chat')

exports.getHomePage = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('HomePage',{product: product, title: 'Online Ordering Pizza',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getall= (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('AllList',{product: product, title: 'All List tab',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.contactus= (req, res, next) => {
    if(!req.cookies["username"]) {
        return res.redirect('/signup');
    } 
    else {
        addPizza.findById(req.params.id).then(product =>{
            // console.log(comment);
            res.render('ContactUs', {product: product,username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
        })
    }
}


exports.getsignupPage = (req, res, next) => {
    res.render('signup', {
        pageTitle: 'signup',
    })
}

exports.getMondaySpecial = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('MondaySpecial',{product: product, pageTitle: 'Monday Special',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getCombodeals = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('Combodeals',{product: product, title: 'Combo deals',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getdrinksPage = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('drinksPage',{product: product, title: 'Drinks Page',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getchocolate = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('chocolate',{product: product, title: 'chocoalte Page',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}
exports.getUserProfile = (req, res, next) => {
    if(!req.cookies["username"]) {
        return res.redirect('/signup');
    } 
    else {
        addPizza.find().then(product =>{
            console.log(product);
        res.render('profile',{product: product, title: 'Profile Page',username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
        })
    }
}

exports.getsidesPage = (req, res, next) => {
    addPizza.find().then(product =>{
        console.log(product);
    res.render('sidesPage',{product: product, title: 'Side Page',username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}

exports.getprofilePage=(req,res,next)=>{
    res.render('profilePage',{
        pageTitle:'Profile page',
    })
}

exports.getorderform=(req,res,next)=>{
    if(!req.cookies["username"]) {
        return res.redirect('/signup');
    } 
    else {
        addPizza.findById(req.params.id).then(product =>{
            // console.log(comment);
            res.render('orderform', {product: product,username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
        })
    }
}

exports.getbooking=(req,res,next)=>{
    if(!req.cookies["username"]) {
        return res.redirect('/signup');
    } 
    else {
        addPizza.findById(req.params.id).then(product =>{
            // console.log(comment);
            res.render('booking', {product: product,username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
        })
    }
}

exports.getproductPage = (req, res, next) => {
    addPizza.findById(req.params.id, function(err, product){
        console.log(product);
        UserComment.find().then(comment =>{
            // console.log(comment);
            res.render('productPage', {comment: comment, product: product,username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
        })
    });
}

exports.getPurchase=(req,res,next)=>{
    res.render('purchaseHistory',{
        pageTitle:'purchaseHistory'
    })
    
}

exports.getadminPage=(req,res,next)=>{
    if(req.cookies["username"] == "admin2021") {
        addPizza.find().then(price =>{
            console.log(price);
        res.render('adminPage',{price: price, username: req.cookies["username"]});
        }).catch(err=>{
            console.log(err);
        })
    } 
    else {
        res.write("You are not an admin, imposter!");
        res.end();
    }
}
exports.getmessage=(req,res,next)=>{
    if(req.cookies["username"] == "admin2021") {
        chats.find().then(message =>{
        res.render('messageBox',{message: message, postAt: message.postAt, username: req.cookies["username"]}, );
        }).catch(err=>{
            console.log(err);
        })
    } 
}

exports.getrecipt=(req,res,next)=>{
    res.render('Recipt',{
        pageTitle:'Recipt'
    })
}

exports.getbookingrecipt=(req,res,next)=>{
    res.render('BookingReceipt',{
        pageTitle:'BookingReceipt'
    })
}



exports.getorderlog=(req,res,next)=>{
    if(req.cookies["username"] == "admin2021") {
        Order.find().then(order =>{
            res.render('orderlog',{order: order});
        }).catch(err=>{
            console.log(err);
        })
    } 
    else {
        res.write("You are not an admin, imposter!");
        res.end();
    }
}

exports.getcommentlog=(req,res,next)=>{
    if(req.cookies["username"] == "admin2021") {
        addPizza.find(function(err, product){
            UserComment.find().then(comment =>{
                res.render('commentlog', {comment: comment, product: product});
            }).catch(err=>{
                console.log(err);
            })
        });
    } 
    else {
        res.write("You are not an admin, imposter!");
        res.end();
    }
}

exports.search=(req,res,next)=>{
    let search= new RegExp(req.body.search2,'i');
    addPizza.find({title:search}).then(product =>{
    res.render('AllList',{product: product, title: 'All List', username: req.cookies["username"]});
    }).catch(err=>{
        console.log(err);
    })
}