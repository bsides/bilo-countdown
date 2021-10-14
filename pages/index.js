import '@fontsource/montserrat'

import * as dateFns from 'date-fns'

import { useEffect, useState } from 'react'

import Head from 'next/head'
import ptBR from 'date-fns/locale/pt-BR'

// Year, month (starting at 0), day, hour (GMT -3 needs +3), minute, secont
const DATE_UNTIL_BILO = Date.UTC(2021, 10, 23, 16 + 3, 0, 0)

function tick() {
  const start = new Date()
  const end = new Date(DATE_UNTIL_BILO)
  const duration = dateFns.intervalToDuration({ start, end })
  // This does nothing now
  // const durationFormatted = dateFns.formatDuration(duration, {
  //   locale: ptBR,
  //   zero: true,
  //   format: ['days', 'hours', 'minutes', 'seconds'],
  // })
  if (duration.months > 0) {
    duration.days = duration.months * 30 + duration.days
  }
  if (duration.years > 0) {
    duration.days = duration.years * 365 + duration.days
  }
  return duration
}

export default function Home() {
  const [duration, setDuration] = useState(tick())
  const biloDateFull = dateFns.intlFormat(
    new Date(DATE_UNTIL_BILO),
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    {
      locale: 'pt-BR',
    }
  )

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
          <div className="sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl clock-container relative">
            <div className="md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-black text-center uppercase absolute -top-12 md:-top-8 left-0 w-full">
              Até o Bisso encontrar o Vilo
            </div>
            {Object.entries(duration).map((d, index, arr) => {
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
            <div className="md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-black text-center uppercase absolute top-96 -mt-10 md:mt-0 md:top-60 left-0 w-full">
              {biloDateFull}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
