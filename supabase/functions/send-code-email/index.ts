// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { Database } from '../_shared/db_types.ts'

type Record = Database['public']['Tables']['supaswagcodes']['Row']
interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: Record
  schema: 'public'
  old_record: null | Record
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json()

  if (!payload.record.claimed) return new Response('ok')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'thorwebdev <noreply@email.thor.bio>',
      to: payload.record.email,
      subject: 'Supabase LWX SWAG incoming!!!!',
      html: `
      <p>Hey, thanks for attending the Supabase LWX meetup!</p>

      <p>You can use discount code <strong>${payload.record.swag_code}</strong> to reedem one <a href="https://supabase.store/products/supalaunchweekx-dark-mode-tee">LWX dark mode shirt</a>.</p>

      <p>Furthermore, the amazing <a href="https://www.linkedin.com/in/ratul-saha-4b693429/">Ratul</a> is graciously providing a lifetime free discount code <strong>SupaLaunchWeekX</strong> for his <a href="https://modernfullstack.com/course/mfs401">Modern Fullstack Course</a>!</p>

      <p>If you have any questions or want to stay in touch, you can follow me on <a href="https://twitter.com/thorwebdev">Twitter: @thorwebdev</a>.</p>

      <p>Thanks, best,<br>Thor</p>
    `,
    }),
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
})

// To invoke:
// curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
