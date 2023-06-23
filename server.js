const express = require('express');
const app = express();
const { createClient } = require('@supabase/supabase-js');
const port = 5000;

const supabaseUrl = 'https://hpqhchsxjpoyxejxombx.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/api', (req, res) => {
	res.json({"users": ["first", "second"]});
})

app.listen(port, () => {
	console.log(`Server had started on port ${port}`);
})
