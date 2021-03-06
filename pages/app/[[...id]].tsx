import React, { FC, useState } from 'react'
import { Pane, Dialog, majorScale } from 'evergreen-ui'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/client'
import Logo from '../../components/logo'
import FolderList from '../../components/folderList'
import NewFolderButton from '../../components/newFolderButton'
import User from '../../components/user'
import FolderPane from '../../components/folderPane'
import DocPane from '../../components/docPane'
import NewFolderDialog from '../../components/newFolderDialog'
import { folder, doc, connectToDB } from '../../db'

const App: FC<{ folders?: any[]; activeFolder?: any; activeDoc?: any; activeDocs?: any[] }> = ({
  folders,
  activeDoc,
  activeFolder,
  activeDocs,
}) => {
  const router = useRouter()
  const [session, loading] = useSession()
  const [newFolderIsShown, setIsShown] = useState(false)
  const [allFolders, setAllFolders] = useState(folders || [])

  const handleNewFolder = async (name: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/folder/`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { data } = await res.json()
    setAllFolders((state) => [...state, data])
  }

  if (loading) {
    return null
  }

  const Page = () => {
    if (activeDoc) {
      return <DocPane folder={activeFolder} doc={activeDoc} />
    }

    if (activeFolder) {
      return <FolderPane folder={activeFolder} docs={activeDocs} />
    }

    return null
  }

  if (!loading && !session) {
    return (
      <Dialog
        isShown
        title="Session expired"
        confirmLabel="Ok"
        hasCancel={false}
        hasClose={false}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEscapePress={false}
        onConfirm={() => router.push('/signin')}
      >
        Sign in to continue
      </Dialog>
    )
  }

  return (
    <Pane position="relative">
      <Pane width={300} position="absolute" top={0} left={0} background="tint2" height="100vh" borderRight>
        <Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
          <Logo />

          <NewFolderButton onClick={() => setIsShown(true)} />
        </Pane>
        <Pane>
          <FolderList folders={allFolders} />{' '}
        </Pane>
      </Pane>
      <Pane marginLeft={300} width="calc(100vw - 300px)" height="100vh" overflowY="auto" position="relative">
        <User user={session.user} />
        <Page />
      </Pane>
      <NewFolderDialog close={() => setIsShown(false)} isShown={newFolderIsShown} onNewFolder={handleNewFolder} />
    </Pane>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (!session || !session.user) {
    return { props: {} }
  }
  const { db } = await connectToDB()

  const folders = await folder.getFolders(db, session.user.id)

  let activeFolder = null
  let activeDocs = null
  let activeDoc = null
  if (ctx.params.id) {
    activeFolder = folders.find((f) => f._id === ctx.params.id[0])
    activeDocs = await doc.getDocsByFolder(db, activeFolder._id)

    if (ctx.params.id.length > 1) {
      activeDoc = activeDocs.find((d) => d._id === ctx.params.id[1])
    }
  }

  return {
    props: { session, folders, activeFolder, activeDocs, activeDoc },
  }
}

/**
 * Catch all handler. Must handle all different page
 * states.
 * 1. Folders - none selected /app
 * 2. Folders => Folder selected /app/folder_id
 * 3. Folders => Folder selected => Document selected app/folder_id/doc_id
 */
export default App
