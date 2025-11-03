// api/news.js
export default async function handler(req, res) {
  const query = req.query.q;
  const response = await fetch(`https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}`, {
    headers: {
      'X-Naver-Client-Id': process.env.CLIENT_ID,
      'X-Naver-Client-Secret': process.env.CLIENT_SECRET,
    },
  });

  const data = await response.json();
  res.status(200).json(data);
}