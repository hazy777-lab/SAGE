import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { rating, comment, email, language, timestamp } = req.body;

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const id = `feedback:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    await redis.set(id, JSON.stringify({ rating, comment, email, language, timestamp }));

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Feedback error:', error);
    // Still return success — don't block the thank you screen
    return res.status(200).json({ success: true });
  }
}
