import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import api from '../service/api.jsx'

import { Store } from '../service/store'
import { toast } from 'react-toastify'
import { getError } from '../service/utils'

import imgSmart from '../assets/logo.png'
import imgHouse2 from '../assets/imgHouse2.jpg'

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
    <section className="relative w-full h-screen flex items-center justify-center">
      {/* IMAGEM DE FUNDO */}
      <img className="absolute w-full h-full object-cover" src={imgHouse2} alt="Casa" />

      {/* SOBREPOSIÇÃO ESCURA PARA MELHORAR VISIBILIDADE */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* FORMULÁRIO CENTRALIZADO */}
      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 w-full max-w-md mx-auto rounded-lg shadow-lg">
        <Helmet>
          <title>Imosmart | Entrar</title>
        </Helmet>

        <div className="text-center mb-6">
          <img className="mx-auto mb-4 w-40" src={imgSmart} alt="LogoSmart" />
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              placeholder="Seu email"
              type="email"
              id="email"
              className="w-full border rounded px-3 py-2 placeholder-gray-400 bg-gray-700 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              placeholder="Digite sua senha"
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full border rounded px-3 py-2 placeholder-gray-400 bg-gray-700 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible color="#ddd" /> : <AiFillEye color="#ddd" />}
            </span>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition"
            >
              Entrar
            </button>
          </div>

          <div className="text-center text-sm text-gray-300">
            Não tem uma conta?{" "}
            <Link to={`/sign-up`} className="text-blue-400 hover:underline">
              Cadastrar
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
