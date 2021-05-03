import '@fontsource/montserrat'

import * as dateFns from 'date-fns'

import { useEffect, useState } from 'react'

import Head from 'next/head'
import ptBR from 'date-fns/locale/pt-BR'

export default function Home() {
  function tick() {
    const start = new Date()
    const end = new Date(Date.UTC(2021, 4, 22, 14 + 3, 0, 0))
    const duration = dateFns.intervalToDuration({ start, end })
    const durationFormatted = dateFns.formatDuration(duration, {
      locale: ptBR,
      zero: true,
      format: ['days', 'hours', 'minutes', 'seconds'],
    })
    return duration
  }
  const [duration, setDuration] = useState(tick())

  useEffect(() => {
    const interval = setInterval(() => setDuration(tick()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="">
      <Head>
        <title>Bilo Countdown</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid justify-center items-center h-screen space-y-20">
        <div className="grid justify-center items-center h-screen space-y-20">
          <div className="md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl clock-container relative">
            <div className="md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-black text-center uppercase absolute -top-8 left-0 w-full">
              Até o Bisso encontrar o Vilo
            </div>
            {Object.entries(duration).map((d, index, arr) => {
              console.log(d)
              if (d[0] === 'years' || d[0] === 'months') return null
              const digit = ('' + d[1]).length === 1 ? '0' + d[1] : d[1]
              return (
                <div
                  className={`clock-col${
                    index === arr.length - 1 ? ' clock-col-last' : ''
                  }`}
                  key={JSON.stringify(d)}
                >
                  <p
                    className={`text-white clock-timer ${
                      d[0] === 'days'
                        ? 'clock-day'
                        : d[0] === 'hours'
                        ? 'clock-hours'
                        : d[0] === 'minutes'
                        ? 'clock-minutes'
                        : d[0] === 'seconds'
                        ? 'clock-seconds'
                        : ''
                    }`}
                  >
                    {digit}
                  </p>
                  <p className="clock-label">
                    {d[0] === 'days'
                      ? 'dias'
                      : d[0] === 'hours'
                      ? 'horas'
                      : d[0] === 'minutes'
                      ? 'minutos'
                      : d[0] === 'seconds'
                      ? 'segundos'
                      : null}
                  </p>
                </div>
              )
            })}
            <div className="md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-black text-center uppercase absolute top-60 left-0 w-full">
              22 de Maio de 2021
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
