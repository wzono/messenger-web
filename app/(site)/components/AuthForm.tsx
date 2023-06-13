'use client'

import { useCallback, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import AuthSocialButton from './AuthSocialButton'
import Button from '@/app/components/Button'
import Input from '@/app/components/inputs/Input'

type Variant = 'LOGIN' | 'REGISTER'

function signup(data: FieldValues) {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(r => r.json())
    .then(body => {
      if (body.error) throw new Error(body.error)
    })
}

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  // state loading
  const [loading, setLoading] = useState(false)

  // toggle variant
  const toggleVariant = useCallback(() => {
    setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN')
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === 'LOGIN') {
      setLoading(true)
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((res) => {
          if (res?.error) {
            toast.error(`login failed: ${res.error}`)
            return
          }

          res?.ok && toast.success('login success')
        })
        .finally(() => setLoading(false))
    }

    if (variant === 'REGISTER') {
      setLoading(true)
      signup(data)
        .then(user => {
          toast.success('register success')
          // eslint-disable-next-line no-console
          console.debug(user)
        })
        .catch(error => {
          toast.error(`register failed: ${error.message}`)
          console.error(error)
        })
        .finally(() => setLoading(false))
    }
  }

  const socialAction = (action: 'github' | 'google') => {
    setLoading(true)

    signIn(action, {
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          toast.error(`login failed: ${res.error}`)
          return
        }

        res?.ok && toast.success('login success')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {
            variant === 'REGISTER' && (
              <Input
                errors={errors}
                label="Name"
                name="name"
                register={register}
                disabled={loading}
              />
            )
          }
          <Input
            errors={errors}
            label="Email"
            name="email"
            register={register}
            type="email"
            disabled={loading}

          />
          <Input
            errors={errors}
            label="Password"
            name="password"
            register={register}
            type="password"
            disabled={loading}
          />
          <div>
            <Button
              block
              disabled={loading}
              htmlType="submit"
            >
              {variant === 'LOGIN' ? 'Login' : 'Register'}
            </Button>
          </div>

        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
            >
              <div
                className="
                  w-full
                  border-t
                  border-gray-300
                "
              />
            </div>
            <div
              className="relative flex justify-center text-sm"
            >
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            >
              Github
            </AuthSocialButton>
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            >
              Google
            </AuthSocialButton>
          </div>
        </div>

        <div
          className="mt-6 flex justify-center text-sm px-2 text-gray-500 gap-2"
        >
          <div>
            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
          </div>

          <div
            className="underline cursor-pointer"
            onClick={toggleVariant}
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>

    </div>
  )
}

export default AuthForm
