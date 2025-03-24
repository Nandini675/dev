 const adminAuth = (req,res,next)=>{
    const token= "xyz";
    const isadminauth = token === "xyz";
    if(!isadminauth){
        return res.status(401).send("unauthorized access");
    }
    else{
      next();
    }
};
module.exports = {
    adminAuth
}