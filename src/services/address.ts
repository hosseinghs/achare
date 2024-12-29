import api from "@/axios"
import type { IAddress, IUserInfo } from "./type"

const BASE_CONTROLLER_URL = 'karfarmas/address'

export const getAllAddresses = async (): Promise<IAddress[]> => {
    return await api.get(BASE_CONTROLLER_URL)
}

export const createAddress = async (payload: IUserInfo): Promise<IAddress[]> => {
  return await api.post(BASE_CONTROLLER_URL, payload)
}
