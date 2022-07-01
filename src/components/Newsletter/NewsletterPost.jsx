import '../../Styles/Newsletter.css'
import React, { useState } from 'react'
import api from '../../Api/post'

function NewsLetter() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [errors, setErrors] = useState({})

  const [newForm, setNewForm] = useState({true: false})

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email) ? '' : 'Ingrese un email valido'
  }

  const validateName = (name) => {
    return name.length > 0 ? '' : 'Ingrese un nombre valido'
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()

    const error = {
      name: validateName(name),
      email: validateEmail(email),
    }

    setErrors(error)

    const hasError = Object.values(errors).some((error) => Boolean(error))

    if (hasError) {
      return
    }
    if (name && email) {
      await api
        .post('newsletter', {
          name: name,
          email: email,
        })
        .then(() => {
          setNewForm({false : true})
          setName('')
          setEmail('')
          setErrors({})
        })
        .catch(() => console.log('Error'))
    }
  }

  return (
    <>
      {newForm ? (
        <section className='Newsletter-section'>
          <h3 className='Newsletter-title'>¡Únete a nuestras novedades y promociones!</h3>
          <form className='Newsletter-form' onSubmit={handleSubmit}>
            <div className='Newsletter-div-input'>
              <input type="text" className='Newsletter-input'
                placeholder="Ingresa tu nombre"
                onChange={(ev) => setName(ev.target.value)}
                error={Boolean(errors.name)}
              />

              <p className='Newsletter-validation'>{errors.name}</p>
            </div>
            <div className='Newsletter-div-input'>
              <input className='Newsletter-input'
                placeholder="Ingresa tu mail"
                onChange={(ev) => setEmail(ev.target.value)}
                error={Boolean(errors.email)}
              />
              <p className='Newsletter-validation'>{errors.email}</p>
            </div>
            <button className='button' type="submit">Suscribirme</button>
          </form>
        </section>
      ) : (
        <div className='Newsletter-section'>
          <h3 small>Se suscribió exitosamente!</h3>
          <p className='Newsletter-text'>
            Muy pronto recibirás nuestras novedades y promociones en tu correo
          </p>
          <button className='button' onClick={() => setNewForm(true)} big>
            Volver
          </button>
        </div>
      )}
    </>
  )
}

export default NewsLetter