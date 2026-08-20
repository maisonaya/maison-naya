import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, CakeSlice, Camera, Check, ChefHat, Clock3, Heart,
  MapPin, Menu, MessageCircle, Minus, Plus, Search, ShoppingBag,
  Sparkles, WandSparkles, X
} from 'lucide-react'

const WHATSAPP_NUMBER = '212617453413'

const products = [
  { id: 1, name: 'Éclat Pistache', category: 'Entremets', price: 320, desc: 'Pistache, framboise et fleur d’oranger', tag: 'Signature', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85' },
  { id: 2, name: 'Nuage Vanille', category: 'Gâteaux', price: 280, desc: 'Vanille de Madagascar, poire et amande', tag: 'Nouveau', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=85' },
  { id: 3, name: 'Forêt Noire Maison', category: 'Gâteaux', price: 300, desc: 'Chocolat noir, cerise et chantilly légère', tag: 'Classique', image: 'https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&w=1200&q=85' },
  { id: 4, name: 'Red Velvet', category: 'Gâteaux', price: 330, desc: 'Cacao délicat et crème onctueuse au fromage', tag: 'Tendance', image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=1200&q=85' },
  { id: 5, name: 'Croissant Pur Beurre', category: 'Viennoiseries', price: 14, desc: 'Feuilletage croustillant et cœur fondant', tag: 'Matin', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85' },
  { id: 6, name: 'Pain au Chocolat', category: 'Viennoiseries', price: 16, desc: 'Deux barres de chocolat noir et pâte levée feuilletée', tag: 'Gourmand', image: 'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=1200&q=85' },
  { id: 7, name: 'Roulé Pistache', category: 'Viennoiseries', price: 22, desc: 'Crème pistache et éclats de fruits secs', tag: 'Nouveau', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85' },
  { id: 8, name: 'Jardin Rouge', category: 'Tartelettes', price: 48, desc: 'Fruits rouges, crème légère et basilic', tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85' },
  { id: 9, name: 'Tartelette Citron', category: 'Tartelettes', price: 42, desc: 'Citron frais et meringue délicatement dorée', tag: 'Fraîcheur', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&q=85' },
  { id: 10, name: 'Tiramisu Naya', category: 'Desserts', price: 52, desc: 'Café, mascarpone et cacao intense', tag: 'Iconique', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=85' },
  { id: 11, name: 'Cheesecake Caramel', category: 'Desserts', price: 55, desc: 'Vanille, caramel salé et biscuit croustillant', tag: 'Fondant', image: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&w=1200&q=85' },
  { id: 12, name: 'Corne de Gazelle', category: 'Halawiyat beldiya', price: 95, desc: 'Boîte artisanale aux amandes et fleur d’oranger', tag: 'Tradition', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=85' },
  { id: 13, name: 'Briouates aux Amandes', category: 'Halawiyat beldiya', price: 110, desc: 'Miel, sésame grillé et amandes', tag: 'Maison', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=85' },
  { id: 14, name: 'Ghriba Assortie', category: 'Halawiyat beldiya', price: 90, desc: 'Amande, noix de coco et sésame', tag: 'Coffret', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=85' },
  { id: 15, name: 'Coffret Velours', category: 'Coffrets', price: 190, desc: '12 bouchées, quatre créations maison', tag: 'À offrir', image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=85' },
]

const categories = ['Tous', 'Gâteaux', 'Viennoiseries', 'Desserts', 'Tartelettes', 'Entremets', 'Halawiyat beldiya', 'Coffrets']
const button = 'inline-flex items-center justify-center rounded-full px-7 py-3.5 font-medium transition focus:outline-none focus:ring-2 focus:ring-[#8D4052] focus:ring-offset-2'
const field = 'w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-[#E8BEA4]'

const initialCustom = { base: 'Génoise vanille', creme: 'Pistache', garniture: 'Fruits rouges', taille: '8 à 10 personnes', occasion: 'Anniversaire', couleurs: '', message: '', allergies: '', details: '' }

export default function App() {
  const [mobile, setMobile] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [category, setCategory] = useState('Tous')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [liked, setLiked] = useState([])
  const [custom, setCustom] = useState(initialCustom)

  const filtered = useMemo(() => products.filter(p =>
    (category === 'Tous' || p.category === category) &&
    `${p.name} ${p.desc} ${p.category}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query])
  const count = cart.reduce((sum, item) => sum + item.qty, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const whatsappUrl = message => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  const add = product => { setCart(c => c.some(i => i.id === product.id) ? c.map(i => i.id === product.id ? {...i, qty:i.qty+1} : i) : [...c,{...product,qty:1}]); setCartOpen(true) }
  const change = (id,d) => setCart(c => c.map(i => i.id === id ? {...i,qty:i.qty+d}:i).filter(i => i.qty>0))
  const order = () => window.open(whatsappUrl(`Bonjour Maison Naya, je souhaite commander : ${cart.map(i => `${i.qty}x ${i.name}`).join(', ')}. Total : ${total} DH`), '_blank', 'noopener,noreferrer')
  const setChoice = (key,value) => setCustom(c => ({...c,[key]:value}))
  const sendCustom = e => {
    e.preventDefault()
    const message = `Bonjour Maison Naya, je souhaite un devis pour un gâteau personnalisé.\n\nBase : ${custom.base}\nCrème : ${custom.creme}\nGarniture : ${custom.garniture}\nTaille : ${custom.taille}\nOccasion : ${custom.occasion}\nCouleurs : ${custom.couleurs || 'Non précisées'}\nMessage sur le gâteau : ${custom.message || 'Aucun'}\nAllergies ou ingrédients à éviter : ${custom.allergies || 'Aucun signalé'}\nDétails : ${custom.details || 'Aucun'}`
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  return <div className="min-h-screen bg-[#FBF7F2] font-sans text-[#2A1C19]">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#2A1C19]/10 bg-[#FBF7F2]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <button className="rounded-full p-2 lg:hidden" onClick={()=>setMobile(!mobile)} aria-label="Menu"><Menu/></button>
        <a href="#accueil" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#6D1F32] text-[#F7E8D6]"><CakeSlice size={20}/></span><span className="font-serif text-lg tracking-[.16em] sm:text-xl">MAISON NAYA</span></a>
        <nav className="hidden items-center gap-7 text-sm lg:flex"><a href="#creations">Nos créations</a><a href="#composez">Composez votre gâteau</a><a href="#maison">La Maison</a><a href="#contact">Contact</a></nav>
        <div className="flex"><button onClick={()=>setSearchOpen(!searchOpen)} className="hidden rounded-full p-3 hover:bg-white sm:block"><Search size={20}/></button><button onClick={()=>setCartOpen(true)} className="relative rounded-full p-3 hover:bg-white"><ShoppingBag size={21}/>{count>0&&<span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[#6D1F32] px-1 text-[10px] text-white">{count}</span>}</button></div>
      </div>
      <AnimatePresence>{mobile&&<motion.nav initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="overflow-hidden border-t px-6 lg:hidden"><div className="flex flex-col gap-5 py-6">{[['Nos créations','#creations'],['Composez votre gâteau','#composez'],['La Maison','#maison'],['Contact','#contact']].map(([t,h])=><a key={h} href={h} onClick={()=>setMobile(false)}>{t}</a>)}</div></motion.nav>}{searchOpen&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="border-t bg-white px-5 py-4"><div className="mx-auto flex max-w-2xl gap-3"><Search/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} className="w-full outline-none" placeholder="Gâteau, viennoiserie, halawiyat..."/><button onClick={()=>setSearchOpen(false)}><X/></button></div></motion.div>}</AnimatePresence>
    </header>

    <main>
      <section id="accueil" className="relative min-h-[760px] overflow-hidden pt-20"><img src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=2200&q=90" className="absolute inset-0 h-full w-full object-cover" alt="Création Maison Naya"/><div className="absolute inset-0 bg-gradient-to-r from-[#211716]/95 via-[#211716]/55 to-transparent"/><div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 lg:px-8"><motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="max-w-2xl text-white"><p className="mb-6 text-xs uppercase tracking-[.3em] text-[#F0C9AD]">Pâtisserie artisanale · Témara</p><h1 className="font-serif text-6xl leading-[.95] sm:text-7xl lg:text-[90px]">Toutes vos envies,<br/><span className="italic text-[#F0C9AD]">faites maison.</span></h1><p className="mt-7 max-w-lg text-lg leading-8 text-white/80">Gâteaux, viennoiseries, desserts, tartelettes et halawiyat beldiya, préparés avec soin pour chaque moment.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#creations" className={`${button} bg-[#F2D2BB] text-[#301D1B]`}>Voir la carte <ArrowRight className="ml-2" size={17}/></a><a href="#composez" className={`${button} border border-white/50 text-white`}>Composer mon gâteau</a></div></motion.div></div></section>

      <section id="creations" className="px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="text-xs uppercase tracking-[.25em] text-[#8D4052]">Une carte généreuse</p><h2 className="mt-4 font-serif text-4xl sm:text-6xl">Nos créations</h2></div><p className="max-w-md leading-7 text-[#6D5A55]">Du petit-déjeuner aux grandes célébrations, découvrez des créations artisanales pour toutes les envies.</p></div><div className="mt-10 flex gap-2 overflow-x-auto pb-3">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm ${category===c?'border-[#6D1F32] bg-[#6D1F32] text-white':'border-[#2A1C19]/15'}`}>{c}</button>)}</div><motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((p,i)=><motion.article layout initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.025}} key={p.id} className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_15px_50px_rgba(60,30,25,.07)]"><div className="relative aspect-[4/3.8] overflow-hidden"><img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/><span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-[11px] uppercase">{p.tag}</span><button onClick={()=>setLiked(l=>l.includes(p.id)?l.filter(x=>x!==p.id):[...l,p.id])} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90"><Heart size={18} className={liked.includes(p.id)?'fill-[#6D1F32] text-[#6D1F32]':''}/></button></div><div className="p-6"><div className="flex justify-between gap-3"><div><p className="text-xs uppercase tracking-widest text-[#9B766B]">{p.category}</p><h3 className="mt-2 font-serif text-2xl">{p.name}</h3></div><strong>{p.price} DH</strong></div><p className="mt-3 text-sm text-[#7C6862]">{p.desc}</p><button onClick={()=>add(p)} className={`${button} mt-5 w-full bg-[#2A1C19] text-white hover:bg-[#6D1F32]`}>Ajouter au panier <Plus className="ml-2" size={16}/></button></div></motion.article>)}</motion.div></div></section>

      <section id="composez" className="bg-[#301E1C] px-5 py-24 text-white lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><div className="grid h-14 w-14 place-items-center rounded-full bg-[#E8BEA4] text-[#301E1C]"><WandSparkles/></div><p className="mt-7 text-xs uppercase tracking-[.25em] text-[#E8BEA4]">Création personnalisée</p><h2 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">Composez le gâteau qui vous ressemble.</h2><p className="mt-6 leading-7 text-white/65">Choisissez la base, la crème, la garniture et les détails. Votre demande sera envoyée sur WhatsApp pour validation du prix et de la disponibilité.</p><div className="mt-8 rounded-3xl bg-white/10 p-5"><p className="flex gap-3 text-sm text-white/80"><ChefHat className="shrink-0 text-[#E8BEA4]"/>Les allergies seront étudiées avec attention, mais doivent toujours être confirmées directement avec l’atelier.</p></div></div>
      <form onSubmit={sendCustom} className="grid gap-5 rounded-[2rem] bg-white/5 p-6 sm:grid-cols-2 sm:p-8">
        <Select label="Base du gâteau" value={custom.base} onChange={v=>setChoice('base',v)} options={['Génoise vanille','Génoise chocolat','Red velvet','Carrot cake','Base sans gluten']}/>
        <Select label="Crème" value={custom.creme} onChange={v=>setChoice('creme',v)} options={['Vanille','Chocolat','Pistache','Praliné noisette','Caramel beurre salé','Crème légère']}/>
        <Select label="Garniture" value={custom.garniture} onChange={v=>setChoice('garniture',v)} options={['Fruits rouges','Fraise','Mangue','Banane','Lotus','Oreo','Amandes et noisettes']}/>
        <Select label="Taille" value={custom.taille} onChange={v=>setChoice('taille',v)} options={['4 à 6 personnes','8 à 10 personnes','12 à 15 personnes','20 personnes et plus']}/>
        <Select label="Occasion" value={custom.occasion} onChange={v=>setChoice('occasion',v)} options={['Anniversaire','Mariage','Fiançailles','Baby shower','Événement professionnel','Autre']}/>
        <Input label="Couleurs souhaitées" value={custom.couleurs} onChange={v=>setChoice('couleurs',v)} placeholder="Rose poudré et doré"/>
        <Input label="Message sur le gâteau" value={custom.message} onChange={v=>setChoice('message',v)} placeholder="Joyeux anniversaire..."/>
        <Input label="Allergies ou ingrédients à éviter" value={custom.allergies} onChange={v=>setChoice('allergies',v)} placeholder="Noix, lactose..."/>
        <label className="sm:col-span-2"><span className="mb-2 block text-sm text-white/70">Description et idées supplémentaires</span><textarea rows="4" value={custom.details} onChange={e=>setChoice('details',e.target.value)} className={field} placeholder="Thème, style, décoration, date souhaitée..."/></label>
        <button type="submit" className={`${button} sm:col-span-2 bg-[#E8BEA4] text-[#301E1C] hover:bg-white`}>Envoyer ma demande sur WhatsApp <MessageCircle className="ml-2" size={18}/></button>
      </form></div></section>

      <section id="maison" className="px-5 py-24 lg:px-8"><div className="mx-auto max-w-7xl text-center"><p className="text-xs uppercase tracking-[.25em] text-[#8D4052]">La promesse Maison Naya</p><h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl sm:text-6xl">Tradition, créativité et fraîcheur.</h2><div className="mt-14 grid gap-5 text-left md:grid-cols-3">{[[Sparkles,'Ingrédients choisis','Matières premières sélectionnées et parfums naturels.'],[CakeSlice,'Fait maison','Chaque pièce est préparée en petite série dans notre atelier.'],[Clock3,'Fraîcheur absolue','Votre commande est produite au plus près de la dégustation.']].map(([Icon,t,d])=><article key={t} className="rounded-[2rem] bg-[#F0E6DD] p-7"><Icon className="text-[#6D1F32]"/><h3 className="mt-6 font-serif text-2xl">{t}</h3><p className="mt-3 text-[#6D5A55]">{d}</p></article>)}</div></div></section>
      <section id="contact" className="px-5 pb-24 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-white p-8 shadow-xl lg:grid-cols-2"><div><p className="text-xs uppercase tracking-[.25em] text-[#8D4052]">Restons proches</p><h2 className="mt-4 font-serif text-5xl">Une envie gourmande ?</h2><div className="mt-8 flex flex-wrap gap-3"><a href={whatsappUrl('Bonjour Maison Naya, je souhaite obtenir des informations.')} target="_blank" rel="noreferrer" className={`${button} bg-[#25D366] text-white`}><MessageCircle className="mr-2"/>WhatsApp</a><a href="https://instagram.com" target="_blank" rel="noreferrer" className={`${button} border`}><Camera className="mr-2"/>Instagram</a></div></div><div className="rounded-3xl bg-[#F4ECE5] p-6"><p className="flex gap-4"><MapPin className="text-[#8D4052]"/><span><strong>Atelier Maison Naya</strong><br/>Témara · Livraison Rabat et région</span></p><hr className="my-5 border-[#2A1C19]/10"/><p className="flex gap-4"><Clock3 className="text-[#8D4052]"/><span><strong>Du mardi au dimanche</strong><br/>10h00 – 19h00 · Sur commande</span></p></div></div></section>
    </main>
    <footer className="bg-[#241715] px-5 py-12 text-white/70"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row"><div><div className="font-serif text-2xl tracking-[.15em] text-white">MAISON NAYA</div><p className="mt-3 text-sm">Pâtisserie artisanale · Témara</p></div><p className="text-xs">© 2026 Maison Naya</p></div></footer>

    <AnimatePresence>{cartOpen&&<><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setCartOpen(false)} className="fixed inset-0 z-[60] bg-black/40"/><motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-md flex-col bg-[#FBF7F2] p-6"><div className="flex justify-between"><h2 className="font-serif text-3xl">Panier</h2><button onClick={()=>setCartOpen(false)}><X/></button></div><div className="mt-8 flex-1 space-y-4 overflow-y-auto">{cart.length===0?<p className="mt-20 text-center">Votre panier est vide.</p>:cart.map(i=><div key={i.id} className="flex gap-4 rounded-2xl bg-white p-3"><img src={i.image} alt="" className="h-20 w-20 rounded-xl object-cover"/><div className="flex flex-1 flex-col justify-between"><div className="flex justify-between"><strong>{i.name}</strong><span>{i.price*i.qty} DH</span></div><div className="flex items-center gap-3"><button onClick={()=>change(i.id,-1)}><Minus size={15}/></button><span>{i.qty}</span><button onClick={()=>change(i.id,1)}><Plus size={15}/></button></div></div></div>)}</div>{cart.length>0&&<div className="border-t pt-5"><div className="flex justify-between font-serif text-2xl"><span>Total</span><span>{total} DH</span></div><button onClick={order} className={`${button} mt-5 w-full bg-[#25D366] text-white`}><Check className="mr-2"/>Finaliser sur WhatsApp</button></div>}</motion.aside></>}</AnimatePresence>
  </div>
}

function Select({label,value,onChange,options}) { return <label><span className="mb-2 block text-sm text-white/70">{label}</span><select value={value} onChange={e=>onChange(e.target.value)} className={field}>{options.map(o=><option key={o} className="text-[#2A1C19]">{o}</option>)}</select></label> }
function Input({label,value,onChange,placeholder}) { return <label><span className="mb-2 block text-sm text-white/70">{label}</span><input value={value} onChange={e=>onChange(e.target.value)} className={field} placeholder={placeholder}/></label> }
