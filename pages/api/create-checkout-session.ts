import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(`${process.env.SERVER_KEY}`, { apiVersion: '2020-08-27' })

enum products {
  candles = 'price_1IxGQJKhu8QN3H5C0d3lBIj2',
  bracelets = '',
}
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: products.candles,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  })

  switch (req.method) {
    case 'POST':
      res.status(200).json({ id: session.id })

      break
    default:
      res.status(400).end()
  }
}
