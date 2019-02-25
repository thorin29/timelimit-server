import * as Sequelize from 'sequelize'
import { Database } from '../../database'
import { sendManipulationWarningMail } from '../../util/mail'
import { canSendWarningMail } from '../../util/ratelimit-warningmail'

export const sendManipulationWarnings = async ({ database, familyId, deviceName, transaction }: {
  database: Database
  familyId: string
  deviceName: string
  transaction: Sequelize.Transaction
}) => {
  const parentEntries = await database.user.findAll({
    where: {
      familyId,
      type: 'parent'
    },
    transaction
  })

  const targetMailAddresses = parentEntries
    .filter((item) => item.mail !== '')
    .filter((item) => (item.mailNotificationFlags & 1) === 1)
    .map((item) => item.mail)

  await Promise.all(
    targetMailAddresses.map(async (receiver) => {
      if (await canSendWarningMail(receiver)) {
        await sendManipulationWarningMail({ receiver, deviceName })
      }
    })
  )
}
