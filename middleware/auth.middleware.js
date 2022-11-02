exports.YeuCauDangNhap = (req,res,next)=>{
    if (req.session.user){
        next();
    }else {
        res.redirect('/');
    }
}
exports.ChuaDangNhap = (req,res,next)=>{
    if (!req.session.user){
        next();
    }else {
        res.redirect('/products');
    }
}