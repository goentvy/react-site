export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // ✅ 모든 출처 허용
  res.setHeader('Access-Control-Allow-Methods', 'GET'); // ✅ 허용 메서드
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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