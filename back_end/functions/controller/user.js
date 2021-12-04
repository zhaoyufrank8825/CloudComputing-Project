const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// Connect to the firestore database
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// Create the express app, and use cors for outside connecting
const userApp = express();
userApp.use(cors({origin: true}));

// Restful api get fuction is to list all the users in the database
// Send the data to the frontend, with status code 200
userApp.get("/", async (req, res) => {
  const snap = await db.collection("users").get();

  let users = [];
  snap.forEach( doc => {
    let id = doc.id;
    let data = doc.data();

    users.push({id, ...data});
  });
  res.status(200).send(JSON.stringify(users));
});

// Get by ID fuction is getting the user by the passing parameter ID in the database
// Send the data to the frontend, with status code 200
userApp.get("/:id", async(req, res)=>{
  const snap = await db.collection("users").doc(req.params.id).get();
  const userid = snap.id;
  const userdata = snap.data();

  res.status(200).send(JSON.stringify({id: userid, ...userdata}));
})

// Put function is getting new user information from front end, and save to the database to 
// replace the older user information
userApp.put("/:id", async (req, res)=>{
  const body = req.body;
  await db.collection("users").doc(req.params.id).update(body);
  res.status(200).send();
})

// Delete the user by id, and return status code with no body.
userApp.delete("/:id", async(req, res)=>{
  await db.collection("users").doc(req.params.id).delete();
  res.status(200).send();
})

// Save to new user to the database
userApp.post("/", async(req, res) => {
  const user = req.body;
  await db.collection("users").add(user);
  res.status(201).send();
});

exports.user = functions.https.onRequest(userApp);
