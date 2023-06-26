const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // для обробки JSON
app.use(express.urlencoded({ extended: true }));

const port = 5000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/products', async (req, res) => {
	const { data, error } = await supabase
		.from('products')
		.select('*');

	if (error) return res.status(500).send({ error: error.message });

	return res.send(data);
});

app.delete('/product/delete/:id', async (req, res) => {
	const { data, error } = await supabase
		.from('products')
		.delete()
		.eq('id', req.params.id)
})

app.put('/product/add', async (req, res) => {
	const sizeArray = req.body.size.split(",").map(Number);

	const { data, error } = await supabase
		.from('products')
		.insert([
			{
				name: req.body.name,
				count: parseInt(req.body.count),
				size: sizeArray,
				weight: parseInt(req.body.weight),
				description: req.body.description
			},
		])
})

app.put('/product/edit/:id', async (req, res) => {
	let sizeArray;
	if (typeof req.body.size === "string") {
		sizeArray = req.body.size.split(",").map(Number);
	} else {
		sizeArray = req.body.size;
	}

	const { data, error } = await supabase
		.from('products')
		.update([
			{
				name: req.body.name,
				count: parseInt(req.body.count),
				size: sizeArray,
				weight: req.body.weight,
				description: req.body.description
			},
		])
		.eq('id', req.params.id)
})

app.listen(port, () => {
	console.log(`Server had started on port ${port}`);
})
