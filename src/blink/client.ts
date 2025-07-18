import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'ecotravel-booking-platform-si3smoys',
  authRequired: true
})

export default blink