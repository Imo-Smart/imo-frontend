import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import api from '../service/api.jsx'

import { Store } from '../service/store'
import { toast } from 'react-toastify'
import { getError } from '../service/utils'

import imgSmart from '../assets/logo.png'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const { data } = await api.post('/api/users/signin', {
        email,
        password,
      })
      ctxDispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate('/admin/dashboard')
      toast.success(`Bem vindo`)
    } catch (err) {
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-4">
        <Helmet>
          <title>ImoSmart | Entrar</title>
        </Helmet>
        <img className="mx-auto mb-5 img" src={imgSmart} alt="LogoImoSmart" />

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              placeholder="Seu melhor email"
              type="email"
              id="email"
              className="w-full border rounded px-3 py-2 placeholder-gray-400 bg-gray-600 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              placeholder="Digite sua senha"
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full border rounded px-3 py-2 placeholder-gray-400 bg-gray-600 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible color="#111827" />
              ) : (
                <AiFillEye color="#111827" />
              )}
            </span>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
            >
              Conectar
            </button>
          </div>

          <div className="mb-4 text-sm text-white text-center">
            Já tem uma conta?{' '}
            <Link to={`/`} className="text-blue-500">
              Entrar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
