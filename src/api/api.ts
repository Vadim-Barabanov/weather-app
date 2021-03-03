import axios from 'axios'
import { INITIAL_UNITS } from '../common/constants'
import { TUnits } from '../common/types'

const API_KEY = process.env.REACT_APP_API_KEY

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/forecast/',
})

export const weatherAPI = {
    async getWeatherData(city: string, units: TUnits = INITIAL_UNITS) {
        const res = await instance.get(
            `?q=${city}&appid=${API_KEY}&units=${units}`
        )
        return res
    },
}
