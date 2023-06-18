import { useParams } from 'next/navigation'

export const useConversation = () => {
  const { conversationId = '' } = useParams()

  const isOpen = !!conversationId

  return {
    isOpen,
    conversationId,
  }
}
