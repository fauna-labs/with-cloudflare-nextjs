export const config = {
  runtime: 'experimental-edge',
}

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
