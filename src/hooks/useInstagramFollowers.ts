import { useEffect, useState } from 'react'
import { business } from '../data/content'

type Fetcher = () => Promise<number>

/**
 * Número de seguidores do Instagram.
 * Hoje usa o valor configurado em data/content.ts. Para atualizar via API no futuro,
 * basta passar um `fetcher` (ex.: chamada a um endpoint próprio que consulta a Graph API).
 */
export function useInstagramFollowers(fetcher?: Fetcher) {
  const [followers, setFollowers] = useState<number>(business.instagram.followers)

  useEffect(() => {
    if (!fetcher) return
    let alive = true
    fetcher()
      .then((n) => alive && Number.isFinite(n) && setFollowers(n))
      .catch(() => {
        /* mantém o valor configurado se a API falhar */
      })
    return () => {
      alive = false
    }
  }, [fetcher])

  return followers
}

export const formatFollowers = (n: number) => `${Math.round(n / 1000)} mil`
