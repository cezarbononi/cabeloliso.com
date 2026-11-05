import { business } from '../../data/content'
import { ChromeLogo } from '../ui/ChromeLogo'

export function Footer() {
  const links = [
    { href: business.links.instagram, label: 'Instagram' },
    { href: business.links.facebook, label: 'Facebook' },
    { href: business.links.whatsapp, label: 'WhatsApp' },
  ]
  return (
    <footer className="flex flex-col items-center gap-7 border-t border-fg/8 px-5 pt-14 pb-16 text-center">
      <ChromeLogo variant="full" className="w-[200px]" label="Cabeloliso.com — a maior definição em cabelos lisos" />
      <nav aria-label="Redes sociais" className="flex gap-7 text-[11px] tracking-[0.24em] uppercase">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener" className="text-muted transition-colors hover:text-fg">
            {l.label}
          </a>
        ))}
      </nav>
      <p className="text-xs text-muted">
        © {new Date().getFullYear()} {business.name} · {business.address.street}, {business.address.district}, {business.address.city}
      </p>
    </footer>
  )
}
