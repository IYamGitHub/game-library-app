import { RiotApi, Constants } from 'twisted'

const api = new RiotApi()

export async function getAccount () {
  // Recommended to use the nearest routing value to your server: americas, asia, europe
  return (await api.Account.getByRiotId("Hide on bush", "KR1", Constants.RegionGroups.AMERICAS)).response
}