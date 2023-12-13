
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const Agent = require("../models/kagent");
const { where } = require("sequelize");

// exports.register = async (req, res, next) => {
//     try {
//         // let photos = [];
//         // if (req.files.length > 0) {
//         //     req.files.forEach(element => {
//         //         photos.push(`${req.protocol}://${req.get('host')}/images/${element.filename}`);
//         //     });
//         //     req.body.photos = photos;
//         // }
//         //

//         if (req.body.pwd.length < 8) {
//             return res.status(401).json({ message: "password too wike !" });
//         }
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);
//         //
//         //
//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             pwd: hash,
//             // photos: photos
//         });
//         // await newUser.save();
//         // return res.status(201).json({ resulte: newUser });
//         await newUser.save().then((user) => {
//             return res.status(201).json({
//                 result: true,
//                 message: 'successfully  registered !',
//                 data: { id: user._id, email: user.email, activated: user.activated }
//             })
//         }).catch((err) => {
//             return res.status(403).json({ result: false, message: 'faild!', error: err.message, payload: req.body })
//         });
//     } catch (error) {
//         return next(error);
//     }
// }
exports.login = async (req, res, next) => {
    try {
        //search user
        const user = await Agent.findOne({ where: { email: req.body.email } })
        // if user is not found return error
        if (!user) return res.status(401).json({ message: "email or password incorrect !" });
        // if user , check pwd 
        const valid = await bcrypt.compare(req.body.pwd, user.pwd);
        // if pwd incorrect return error
        if (!valid) return res.status(401).json({ message: "email or password incorrect !" });

        // return user
        const salt = await bcrypt.genSaltSync(10);
        const token = Jwt.sign({ id: user.id, email: user.email }, 'SICOM_API', { expiresIn: "2h" });
        const { pwd, codepin, ...newAg } = user.dataValues;
        res.setHeader('content-type', 'text/plain');
        res.cookie("srl", token, { httpOnly: true, });
        res.cookie("tkn", bcrypt.hashSync(newAg.email, salt), { httpOnly: true, });
        res.cookie("pml", bcrypt.hashSync(`${newAg}`, salt), { httpOnly: true, });
        res.status(200).json({
            result: true,
            message: `welcome ${newAg.email} !`,
            data: newAg,
            url: "/pages/home/index.html"
        })

    } catch (error) {
        next(error);
    }

}

// exports.registerAdmin = async (req, res, next) => {
//     try {
//         const salt = bcrypt.genSaltSync(7);
//         const hash = bcrypt.hashSync(req.body.password, salt);

//         //
//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: hash,
//             isAdmin: true,
//             role: 'sysAdmin',
//             activated: true,
//             // photos: photos
//         });
//         await newUser.save().then((user) => {
//             return res.status(201).json({
//                 result: true,
//                 message: 'successfully  registered !',
//                 data: { id: user._id, email: user.email }
//             })
//         }).catch((err) => {
//             return res.status(403).json({ result: false, message: 'faild!', error: err.message, payload: req.body })
//         });
//     } catch (error) {
//         return next(error);
//     }
// }