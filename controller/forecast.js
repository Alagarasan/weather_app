import { Router } from "express";
import request from 'request';
import { FORECAST_API, APP_ID } from "./constants.js";

const router = Router();

const getForecast = (req, res, next) => {
	const { city = '', orderBy = 'asc' } = req.query;
	if(city.length === 0) {
		res.status(400).json({ Error: 'Invalid city name.' });
		return;
	}

	request(`${FORECAST_API}?q=${city}&appid=${APP_ID}`,  { json: true }, (err, response, body) => {
		if(err){
			res.status(500).json({err});
			return;
		}else if(body?.list?.length > 0) {
			let sortedData = [];
			const { list } = body;

			const data = list.map(report => {
				const { main = {}, wind = {} } = report;
				const setData = {
					dt: report.dt,
					temp: {
						temp: main.temp,
						temp_min: main.temp_min,
						temp_max: main.temp_max,
						pressure: main.pressure,
						sea_level: main.sea_level,
						grnd_level: main.grnd_level,
						humidity: main.humidity,
						temp_kf: main.temp_kf,
					},
					wind: {
						speed: wind.speed,
						deg: wind.deg
					}
				};

				return setData;
			});

			sortedData = orderBy === 'desc' ? data.sort((a, b) => b.dt - a.dt) : data.sort((a, b) => a.dt - b.dt);

			res.status(200).json(sortedData);
			return;
		}else {
			res.status(200).json([]);
			return;
		}
	});
}

router.get('/forecast', getForecast);

export default router;
