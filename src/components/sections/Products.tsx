import { ArrowUpRight } from 'lucide-react'
import { products } from '../../data/content'
import { Reveal } from '../ui/Reveal'

/** Produtos criados pelo fundador, apresentados em sequência à sua história. */
export function Products() {
  return (
    <section aria-labelledby="products-title" className="mx-auto max-w-[1320px] px-5 py-[clamp(44px,5vw,68px)] md:px-[clamp(20px,5vw,72px)]">
      <Reveal as="header" className="grid items-end gap-4 border-t border-fg/10 pt-8 md:grid-cols-[1fr_auto] md:gap-10">
        <div>
          <p className="eyebrow">{products.eyebrow}</p>
          <h2 id="products-title" className="mt-3 font-display text-[clamp(30px,3.7vw,48px)] leading-[1.05] font-semibold tracking-[-0.035em] text-fg">
            {products.title}
          </h2>
        </div>
        <p className="max-w-[42ch] text-[15px] text-text/70 md:pb-1">{products.lead}</p>
      </Reveal>

      <ul className="mt-7 grid gap-x-8 lg:grid-cols-2 lg:gap-x-12">
        {products.items.map((product, i) => (
          <Reveal as="li" key={product.name} delay={i}>
            <article className="grid grid-cols-[minmax(100px,145px)_minmax(0,1fr)] items-center gap-5 border-t border-fg/10 py-5 lg:grid-cols-[minmax(120px,176px)_minmax(0,1fr)] lg:gap-7 lg:py-6">
              <figure className={`product-image-stage ${product.name === 'Turbo Protect' ? 'product-image-stage--bottle' : ''} grid aspect-[3/4] place-items-center overflow-hidden rounded-[14px] p-3`}>
                <img src={product.image} alt={product.alt} loading="lazy" className="product-image-shadow size-full object-contain" />
              </figure>
              <div>
                <p className="eyebrow">0{i + 1} · Linha Hot Turbo</p>
                <h3 className="mt-2 font-display text-[clamp(20px,2vw,27px)] leading-tight font-semibold tracking-[-0.025em] text-fg">{product.name}</h3>
                <p className="mt-2 text-[13px] text-muted">{product.detail}</p>
                <a href={product.href} target="_blank" rel="noopener" className="mt-4 inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold tracking-[0.13em] text-fg uppercase underline decoration-fg/25 underline-offset-4 transition-colors hover:decoration-fg">
                  Informações pelo WhatsApp
                  <ArrowUpRight className="size-3.5" strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
