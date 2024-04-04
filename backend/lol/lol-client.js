import { LolApi, Constants } from 'twisted'

const api = new LolApi()

export async function getSummoner () {
  const user = await getAccount()
  return await api.Summoner.getByPUUID(user.puuid, Constants.Regions.AMERICA_NORTH)
}