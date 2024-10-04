import puppeteer from 'puppeteer'
import {
  addressSelectors,
  basicInfoPFSelectors,
  basicInfoPMSelectors,
  fiscalDataSelectors,
  getTextFromSelector,
} from './scrapper'

type Input = {
  rfc: string
  idCif: string
}

const bootstrap = async (input: Input) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const URL = `https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=${input.idCif}_${input.rfc}`

  await page.goto(URL)

  const content = await page.waitForSelector('.ui-content')

  const isPF = input.rfc.length === 13
  try {
    const basicInfoSelector = isPF ? basicInfoPFSelectors : basicInfoPMSelectors
    const selectors = {
      ...basicInfoSelector,
      ...addressSelectors,
      ...fiscalDataSelectors,
    }
    const selectorKeys = Object.keys(selectors)

    const values = await Promise.all(
      selectorKeys.map((key: string) =>
        getTextFromSelector(content, selectors[key])
      )
    )
    const data = selectorKeys.reduce(
      (
        acc: { [key: string]: string | null | undefined },
        key: string,
        index: number
      ) => {
        acc[key] = values[index]
        return acc
      },
      {}
    )

    return { rfc: input.rfc, ...data }
  } catch (e) {
    console.log(e)
    return {
      rfc: input.rfc,
      error: 'No se encontraron datos. Verifica la informacion ingresada.',
    }
  }
}

bootstrap({ rfc: '', idCif: '' }).then(console.log)
