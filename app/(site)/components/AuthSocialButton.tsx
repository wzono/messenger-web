import React from 'react'
import type { IconType } from 'react-icons'

interface AuthSocialButtonProps {
  icon: IconType
  onClick: () => void
  children?: React.ReactNode
}

const AuthSocialButton = ({ icon: Icon, onClick, children }: AuthSocialButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full
        justify-center
        items-center
        rounded-md
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-200
        hover:bg-gray-50
        focus:outline-offset-0
        gap-1
      "
    >
      <Icon />
      {children}
    </button>
  )
}

export default AuthSocialButton
