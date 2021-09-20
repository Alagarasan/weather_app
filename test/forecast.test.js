import app from '../app.js';
import supertest from 'supertest';

describe('Forecast tests', () => {

	test("Receive 400 status from get forecast api, no city name is given", async () => {
		await supertest(app).get("/forecast")
			.expect(400)
			.then((response) => {
			expect(response.body.Error).toBeDefined();
			expect(response.body.Error).toBe('Invalid city name.');
		});
	});
	
	test("Receive empty data from get forecast api, if improper city name is given", async () => {
		await supertest(app).get("/forecast?city=chennaixyzz&orderBy=desc")
			.expect(200)
			.then((response) => {
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length === 0).toBeTruthy();
		});
	});

	test("Receive data from get forecast api", async () => {
		await supertest(app).get("/forecast?city=chennai&orderBy=desc")
			.expect(200)
			.then((response) => {
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length > 0).toBeTruthy();
			
			expect(response.body[0].dt).toBeDefined();
			expect(response.body[0].temp).toBeDefined();
			expect(response.body[0].wind).toBeDefined();
		});
	});

});
