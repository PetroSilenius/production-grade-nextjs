import nc from 'next-connect'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { folder } from '../../../db'
import { Request } from '../../../types'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.post(async (req: Request, res) => {
  const newDoc = await folder.createFolder(req.db, {
    ...req.body,
    createdBy: req.user.id,
    name: req.body.name,
  })
  res.send({ data: newDoc })
})

export default handler
