import { Database } from '../../database'
import { sendUninstallWarningMail } from '../../util/mail'
import { canSendWarningMail } from '../../util/ratelimit-warningmail'

export const sendUninstallWarnings = async ({ database, familyId, deviceName }: {
  database: Database
  familyId: string
  deviceName: string
}) => {
  const parentEntries = await database.user.findAll({
    where: {
      familyId,
      type: 'parent'
    }
  })

  const targetMailAddresses = parentEntries
    .filter((item) => item.mail !== '')
    .filter((item) => (item.mailNotificationFlags & 1) === 1)
    .map((item) => item.mail)

  await Promise.all(
    targetMailAddresses.map(async (receiver) => {
      if (await canSendWarningMail(receiver)) {
        await sendUninstallWarningMail({ receiver, deviceName })
      }
    })
  )
}
