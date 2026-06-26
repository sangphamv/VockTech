const http = require('https');

http.get('https://vocktech.pages.dev/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const body = data.split('</head>')[1] || data;
    const noScript = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    const noStyle = noScript.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    const textOnly = noStyle.replace(/<[^>]+>/g, '\n').replace(/\n\s*\n/g, '\n');
    console.log(textOnly.substring(0, 3000));
  });
});
