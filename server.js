const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
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
	const { data, error } = await supabase
		.from('products')
		.insert([
			{ some_column: 'someValue', other_column: 'otherValue' },
		])
})

app.listen(port, () => {
	console.log(`Server had started on port ${port}`);
})
