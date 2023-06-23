const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/api', async (req, res) => {
	const { data, error } = await supabase
		.from('products')
		.select('*');

	if (error) return res.status(500).send({ error: error.message });

	return res.send(data);
});

app.listen(port, () => {
	console.log(`Server had started on port ${port}`);
})
