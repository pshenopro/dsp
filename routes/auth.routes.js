const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();

const backAPI = config.get("backApi");

router.post('/registr',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Маленький пароль').isLength({min: 5})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                });
            }

            let {email, password} = req.body;

            const candidate = await User.findOne({email});

            if(candidate) {
                return res.status(400).json({message: 'Уже есть такой пользователь'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword});

            await user.save();

            res.status(201).json({message: 'user is created'})

        } catch (e) {
            res.status(500).json({ message: '500ая ошибка....'})
        }
});

router.post('/login', {},
        async (req, res, next) => {
            console.log('asdsd')
            const data = { login: req.body.email, password: req.body.password };
            request({
                url: backAPI + "api/user/login",
                method: "POST",
                json: true,   // <--Very important!!!
                body: data
            }, function (error, response, body){

                if (error) {
                    res.status(500);
                    res.json({message: 'SERVER ERROR'});
                    next();

                    return
                }

                if (response.body.status === 'error') {
                    res.status(400)
                }

                res.json(response.body)
            });
        });

router.post('/loginsss',
    [
        check('email', 'Введите корректный эмаил').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                });
            }

            const {email, password} = req.body;

            const user = await User.findOne({ email });

            if(!user) {
                return res.status(500).json({ message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            res.json({token, userId: user.id})



        } catch (e) {
            res.status(500).json({ message: '500ая ошибка....'})
        }
});

module.exports = router;