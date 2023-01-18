const express = require("express")
require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { UserModel } = require("./module/User.Module")
const { connections } = require("./config/db")
const { authenticate } = require("./middlewear/authentication")


const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Home Page working")
})

// signup
app.post("/signup", async (req, res) => {
    const { email, password, name, age } = req.body;
    const userPresent = await UserModel.findOne({ email })
    if (userPresent) {
        res.send("Try login user already exist")
    }

    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            // Store hash in your password DB.
            const user = new UserModel({email,password:hash,name,age})
            await user.save()
            res.send("Signup Sucessfull")
        });


    } catch (err) {
        console.log(err)
        res.send("Something went wrong ")
    }
})

// login..........

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            const hashed_password = user[0].password;
            bcrypt.compare(password, hash, function (err, result) {
                if (result) {
                    const token = jwt.sign({ foo: 'bar' }, 'hush');
                    res.send({ "msg": "Login Sucessfull", "token": token })
                } else {
                    res.send("Login Failed")
                }
            });

        } else {
            res.send("Login Failed")
        }

    }
    catch (err) {

        res.send({ "msg": "Something went wrong" })
    }
    res.send("work in progress")
})

// app.get("/weather", (req, res) => {
//     const token = req.headers.authorization?.split(" ")[1]
//     var decoded = jwt.verify(token, 'hush', (err, decoded) => {
//         if (err) {
//             res.send("Please login again")
//         } else if (decoded) {
//             res.send("weather.....")
//         }
//     });

// })


app.get("/about", (req, res) => {
    res.send("About us data..")
})

app.use(authenticate)
app.use("/users",userRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connections;
        console.log("Connect to db sucessfull")
    }
    catch (err) {
        console.log("Connect to db failed")
    }
    console.log("Listing on http://localhost:8080")
})



























