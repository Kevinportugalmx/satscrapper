import { ElementHandle } from 'puppeteer'

export const getTextFromSelector = async (
  div: ElementHandle<Element> | null,
  selector: string
) => {
  return await div?.$eval(selector, (element) => element.textContent)
}

const getSelectorsFromTable = (element: string, keys: string[]) => {
  const selectors: { [key: string]: string } = {}
  for (const idx in keys) {
    const key = keys[idx]
    const parsedIdx = parseInt(idx, 10) + 1
    const xpath = `::-p-xpath(/html/body/div[1]/div/form/${element}/table/tbody/tr[1]/td/div/div/table/tbody/tr[${parsedIdx}]/td[2])`
    selectors[key] = xpath
  }
  return selectors
}

export const basicInfoPFSelectors = getSelectorsFromTable('ul[2]/li[2]', [
  'curp',
  'nombre',
  'apellidoPaterno',
  'apellidoMaterno',
  'fechaNacimiento',
  'fechaInicioOperaciones',
  'situacionContribuyente',
  'fechaUltimoCambioSituacion',
])

export const basicInfoPMSelectors = getSelectorsFromTable('ul[2]/li[2]', [
  'razonSocial',
  'regimenDeCapital',
  'fechaConstitucion',
  'fechaInicioOperaciones',
  'situacionContribuyente',
  'fechaUltimoCambioSituacion',
])

export const addressSelectors = getSelectorsFromTable('/ul[3]/li[2]', [
  'entidadFederativa',
  'municipio',
  'colonia',
  'tipoVialidad',
  'nombreVialidad',
  'numeroExterior',
  'numeroInterior',
  'cp',
  'email',
  'al',
])

export const fiscalDataSelectors = getSelectorsFromTable('/ul[4]/li[2]', [
  'regimen',
  'fechaAlta',
])
