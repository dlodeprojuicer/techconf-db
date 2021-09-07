import express from "express";
import fetch from "node-fetch";
import redis from "redis";
import axios from "axios"; 

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const redisClient = redis.createClient(REDIS_PORT);

const app = express();

const getRepos2 = () => {
	axios
		.get(`https://api.ghithub.com/users/dlodeprojuicer`, {
			username: "dlodeprojuicer"
		})
		.then(data => {
			console.log("axios data", data);
		})
		.catch(err => {
			console.log("axios err", err.toJSON());
		});
}

async function getRepos(req, res, next) {
	try {
		console.log("Fetching data...");

		// const { username = "dlodeprojuicer" } = req.params;
		const response = await fetch(`https://api.ghithub.com/users/dlodeprojuicer`);

		const data = response.json();

		console.log("DDDD",data);

		res.send(data);
	} catch (err) {
		console.log(err);
		res.status(500);
	}
}

app.get("/repos/:username", getRepos2)

app.listen(5000, () => {
	console.log(`Listening to port ${PORT}`);
})