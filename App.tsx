
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Globe, Mail, User, ShieldCheck, ShoppingCart, ArrowRight, Star, Heart, Share2, Facebook, Twitter, Instagram, Send, CheckCircle } from 'lucide-react';
import { PILLARS, POSTS, PRODUCTS, LANGUAGES } from './constants';
import { Language, User as UserType } from './types';

// --- Context & State Simulation ---
const AuthContext = React.createContext<{
  user: UserType | null;
  login: () => void;
  logout: () => void;
}>({ user: null, login: () => {}, logout: () => {} });

// --- Components ---

const LanguageSwitcher = ({ current, onChange }: { current: Language, onChange: (l: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition">
        <Globe size={16} />
        <span>{current}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-xl z-50">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { onChange(l.code); setIsOpen(false); }}
              className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MegaMenu = () => {
  return (
    <div className="hidden lg:block">
      <div className="group inline-block">
        <button className="flex items-center space-x-1 py-4 text-slate-700 hover:text-blue-600 font-medium transition">
          <span>Categories</span>
          <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
        </button>
        <div className="absolute left-0 top-full w-full bg-white border-t border-slate-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="max-w-7xl mx-auto grid grid-cols-4 p-8 gap-8">
            {PILLARS.map((p) => (
              <div key={p.id}>
                <Link to={`/category/${p.slug}`} className="flex items-center space-x-2 text-blue-600 font-bold mb-3 hover:underline">
                  <span className="text-xl">{p.icon}</span>
                  <span>{p.name}</span>
                </Link>
                <div className="flex flex-col space-y-1">
                  {p.subcategories.map(sub => (
                    <Link key={sub} to={`/category/${p.slug}/${sub.toLowerCase().replace(' ', '-')}`} className="text-sm text-slate-500 hover:text-blue-600">
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">N</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">NicheAtlas</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/start-here" className="text-slate-700 hover:text-blue-600 font-medium transition">Start Here</Link>
            <MegaMenu />
            <Link to="/best-of" className="text-slate-700 hover:text-blue-600 font-medium transition">Best Of</Link>
            <Link to="/shop" className="text-slate-700 hover:text-blue-600 font-medium transition">Shop</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Search ideas..." className="bg-transparent border-none outline-none text-sm w-32 lg:w-48" />
            </div>
            <LanguageSwitcher current={lang} onChange={setLang} />
            <Link to="/newsletter" className="hidden lg:block bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition shadow-sm">
              Newsletter
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-600">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4">
          <Link to="/start-here" className="block text-lg font-medium">Start Here</Link>
          <div className="space-y-2 pl-4">
            <p className="text-xs uppercase text-slate-400 font-bold">Pillars</p>
            {PILLARS.map(p => (
              <Link key={p.id} to={`/category/${p.slug}`} className="block text-slate-600">{p.name}</Link>
            ))}
          </div>
          <Link to="/best-of" className="block text-lg font-medium">Best Of</Link>
          <Link to="/shop" className="block text-lg font-medium">Shop</Link>
          <div className="pt-4 border-t border-slate-100">
            <Link to="/newsletter" className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg">Subscribe</Link>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-black">N</span>
            </div>
            <span className="text-xl font-bold text-white">NicheAtlas</span>
          </Link>
          <p className="max-w-xs mb-6 text-slate-400">
            NicheAtlas is your daily destination for practical guides, expert insights, and evergreen ideas across every category of life.
          </p>
          <div className="flex space-x-4">
            <Facebook size={20} className="hover:text-white cursor-pointer" />
            <Twitter size={20} className="hover:text-white cursor-pointer" />
            <Instagram size={20} className="hover:text-white cursor-pointer" />
            <Send size={20} className="hover:text-white cursor-pointer" />
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Pillars</h4>
          <ul className="space-y-3 text-sm">
            {PILLARS.slice(0, 4).map(p => <li key={p.id}><Link to={`/category/${p.slug}`} className="hover:text-blue-400 transition">{p.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/start-here" className="hover:text-blue-400 transition">Start Here</Link></li>
            <li><Link to="/best-of" className="hover:text-blue-400 transition">Best Of</Link></li>
            <li><Link to="/shop" className="hover:text-blue-400 transition">Digital Store</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 transition">Terms of Service</Link></li>
            <li><Link to="/cookies" className="hover:text-blue-400 transition">Cookie Settings</Link></li>
            <li><Link to="/gdpr" className="hover:text-blue-400 transition">GDPR Compliance</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-20 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} NicheAtlas. All rights reserved. Professional guides for real life.</p>
        <p className="mt-2">Disclaimer: Some links on this site may be affiliate links. We earn a small commission if you buy through them at no extra cost to you.</p>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Find the best ideas in every niche.</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            NicheAtlas helps thousands of readers master their finances, home, career, and wellbeing with practical evergreen guides.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/start-here" className="w-full sm:w-auto bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-lg">
              Start Here →
            </Link>
            <div className="w-full sm:w-auto bg-blue-500/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 flex items-center">
              <Search size={20} className="mr-3 text-blue-100" />
              <input type="text" placeholder="Search 500+ guides..." className="bg-transparent border-none outline-none text-white placeholder-blue-200 w-full sm:w-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Explore Our Pillars</h2>
          <Link to="/categories" className="text-blue-600 font-semibold hover:underline">View All Categories</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PILLARS.map(p => (
            <Link key={p.id} to={`/category/${p.slug}`} className="group bg-white border border-slate-100 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{p.icon}</div>
              <h3 className="text-lg font-bold mb-2">{p.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Posts (Editorial Layout) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center space-x-4 mb-10">
            <h2 className="text-3xl font-bold">The Latest Guides</h2>
            <div className="h-[2px] bg-slate-100 flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {POSTS.slice(0, 1).map(post => (
              <Link key={post.id} to={`/post/${post.slug}`} className="block group">
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Featured Guide
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-4 hover:text-blue-600 transition">{post.title}</h3>
                <p className="text-lg text-slate-500 mb-6">{post.excerpt}</p>
                <div className="flex items-center text-sm text-slate-400 font-medium">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="space-y-10">
            {POSTS.slice(1, 4).map(post => (
              <Link key={post.id} to={`/post/${post.slug}`} className="flex space-x-4 group">
                <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition mb-2 leading-snug">{post.title}</h4>
                  <div className="text-xs text-slate-400">{post.date} • {post.readingTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Block */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Practical ideas, delivered to your inbox.</h2>
            <p className="text-lg text-slate-400 mb-10">Join 50,000+ others who receive our weekly "Top 5 Niche Ideas" digest. Zero spam, just helpful stuff.</p>
            <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
              <input type="email" placeholder="Your best email address" className="bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500 flex-grow" />
              <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition">Subscribe Now</button>
            </form>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                <div className="flex items-center justify-center"><CheckCircle size={14} className="mr-1 text-blue-500" /> Money</div>
                <div className="flex items-center justify-center"><CheckCircle size={14} className="mr-1 text-blue-500" /> Tech</div>
                <div className="flex items-center justify-center"><CheckCircle size={14} className="mr-1 text-blue-500" /> Wellness</div>
                <div className="flex items-center justify-center"><CheckCircle size={14} className="mr-1 text-blue-500" /> Travel</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PostPage = ({ slug }: { slug: string }) => {
  const post = POSTS.find(p => p.slug === slug) || POSTS[0];

  return (
    <article className="max-w-5xl mx-auto px-4 py-20">
      <header className="mb-12 text-center">
        <Link to={`/category/${post.category}`} className="inline-block text-blue-600 font-bold uppercase tracking-widest text-xs mb-4 hover:underline">
          {post.category.replace('-', ' & ')}
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{post.title}</h1>
        <div className="flex items-center justify-center space-x-4 text-slate-500">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-slate-200 rounded-full mr-2"></div>
            <span className="font-medium">{post.author}</span>
          </div>
          <span>•</span>
          <span>Last Updated: {post.updatedDate || post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-16 shadow-2xl">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Table of Contents Sidebar */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-32 h-fit">
          <h4 className="font-bold text-slate-900 mb-4 border-b pb-2">In This Guide</h4>
          <nav className="space-y-3 text-sm text-slate-500">
            <a href="#intro" className="block hover:text-blue-600">Introduction</a>
            <a href="#why" className="block hover:text-blue-600">Why It Matters</a>
            <a href="#key" className="block hover:text-blue-600">Key Takeaways</a>
            <a href="#breakdown" className="block hover:text-blue-600">Detailed Breakdown</a>
            <a href="#faq" className="block hover:text-blue-600">FAQ</a>
          </nav>
          <div className="mt-12 p-6 bg-blue-50 rounded-2xl">
            <h5 className="font-bold text-blue-900 mb-2">Want more like this?</h5>
            <p className="text-xs text-blue-700 mb-4">Join our newsletter for weekly deep dives.</p>
            <Link to="/newsletter" className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg text-xs font-bold">Subscribe</Link>
          </div>
        </aside>

        {/* Content Body */}
        <div className="lg:col-span-6 prose prose-slate prose-lg max-w-none">
          <div id="intro" dangerouslySetInnerHTML={{ __html: post.content.replace(/##/g, '<h2>').replace(/###/g, '<h3>').replace(/> /g, '<blockquote>').replace(/---/g, '<hr>') }} />
          
          <div className="mt-16 p-8 bg-slate-100 rounded-2xl not-prose">
            <h4 className="font-bold mb-4">Was this helpful?</h4>
            <div className="flex space-x-4">
              <button className="flex items-center bg-white px-4 py-2 rounded-lg border border-slate-200 hover:bg-green-50 hover:border-green-200 transition">
                <Heart size={18} className="mr-2 text-slate-400" /> Yes
              </button>
              <button className="flex items-center bg-white px-4 py-2 rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 transition">
                <X size={18} className="mr-2 text-slate-400" /> No
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3 space-y-12">
            <div className="p-6 bg-slate-900 text-white rounded-3xl">
                <h4 className="font-bold mb-4">Share This Guide</h4>
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center bg-blue-600 py-2 rounded-lg"><Facebook size={16} /></button>
                    <button className="flex items-center justify-center bg-sky-500 py-2 rounded-lg"><Twitter size={16} /></button>
                    <button className="flex items-center justify-center bg-red-600 py-2 rounded-lg"><Share2 size={16} /></button>
                    <button className="flex items-center justify-center bg-blue-800 py-2 rounded-lg"><Send size={16} /></button>
                </div>
            </div>

            <div>
                <h4 className="font-bold mb-6 border-b pb-2">Related Guides</h4>
                <div className="space-y-6">
                    {POSTS.slice(5, 8).map(p => (
                        <Link key={p.id} to={`/post/${p.slug}`} className="flex space-x-3 group">
                            <div className="w-16 h-16 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
                                <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                            </div>
                            <h5 className="text-sm font-bold leading-tight group-hover:text-blue-600">{p.title}</h5>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
      </div>
    </article>
  );
};

const ShopPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6">The NicheAtlas Digital Store</h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">High-quality templates, planners, and bundles designed to help you execute on the ideas we share in our guides.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {PRODUCTS.map(product => (
                    <div key={product.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-4 flex flex-col hover:shadow-2xl transition-all duration-500">
                        <div className="aspect-square rounded-[2rem] overflow-hidden mb-6">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="px-4 flex-grow">
                            <div className="text-xs font-bold text-blue-600 uppercase mb-2">{product.type}</div>
                            <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                            <p className="text-slate-500 text-sm mb-6">{product.description}</p>
                        </div>
                        <div className="px-4 pb-4 flex items-center justify-between mt-auto">
                            <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-600 transition flex items-center">
                                <ShoppingCart size={18} className="mr-2" /> Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const CategoryPage = ({ slug }: { slug: string }) => {
    const category = PILLARS.find(p => p.slug === slug);
    const posts = POSTS.filter(p => p.category === category?.id);

    if (!category) return <div>Category not found.</div>;

    return (
        <div className="pb-20">
            <header className="bg-slate-100 py-20 text-center">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h1 className="text-5xl font-bold mb-4">{category.name}</h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">{category.description}</p>
            </header>
            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                {posts.map(post => (
                    <Link key={post.id} to={`/post/${post.slug}`} className="group bg-white rounded-3xl overflow-hidden hover:shadow-xl transition shadow-sm border border-slate-100">
                        <div className="aspect-[16/10] overflow-hidden">
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600">{post.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                            <div className="text-xs text-slate-400 font-medium uppercase tracking-widest">{post.readingTime}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// --- Main App Component ---

const AppContent = () => {
  const [lang, setLang] = useState<Language>('EN');
  const [user, setUser] = useState<UserType | null>(null);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex">
        <aside className="w-64 border-r border-slate-800 p-6 flex flex-col">
            <Link to="/" className="text-xl font-bold mb-10 block">NicheAtlas Admin</Link>
            <nav className="flex-grow space-y-4">
                <Link to="/admin" className="block p-3 bg-blue-600 rounded-lg">Dashboard</Link>
                <Link to="/admin/posts" className="block p-3 hover:bg-slate-800 rounded-lg">Posts</Link>
                <Link to="/admin/pages" className="block p-3 hover:bg-slate-800 rounded-lg">Pages</Link>
                <Link to="/admin/shop" className="block p-3 hover:bg-slate-800 rounded-lg">Shop</Link>
                <Link to="/admin/settings" className="block p-3 hover:bg-slate-800 rounded-lg">Settings</Link>
            </nav>
            <button onClick={() => window.location.href = '#/'} className="mt-auto text-slate-500 hover:text-white">Exit Admin</button>
        </aside>
        <main className="flex-grow p-10 overflow-auto">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-slate-800 p-6 rounded-2xl">
                    <p className="text-slate-400 text-sm font-bold mb-2 uppercase">Total Posts</p>
                    <p className="text-4xl font-black">42</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl">
                    <p className="text-slate-400 text-sm font-bold mb-2 uppercase">Subscribers</p>
                    <p className="text-4xl font-black">52,391</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl">
                    <p className="text-slate-400 text-sm font-bold mb-2 uppercase">Store Revenue</p>
                    <p className="text-4xl font-black">$12,402</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl">
                    <p className="text-slate-400 text-sm font-bold mb-2 uppercase">Page Views</p>
                    <p className="text-4xl font-black">1.2M</p>
                </div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="flex items-center justify-between border-b border-slate-700 pb-4">
                            <div>
                                <p className="font-bold">New Post: How to save money in 2024</p>
                                <p className="text-xs text-slate-500">Published 2 hours ago by Jordan Smith</p>
                            </div>
                            <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded">Live</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} setLang={setLang} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:slug" element={<RouteWrapper component={PostPage} />} />
          <Route path="/category/:slug" element={<RouteWrapper component={CategoryPage} />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/start-here" element={<StartHerePage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<div className="p-20 text-center">Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

// Helper to pass params to components
const RouteWrapper = ({ component: Component }: { component: any }) => {
    const { slug } = useLocation().pathname.split('/').reduce((acc, curr, i, arr) => {
        if (arr[i-1] === 'post' || arr[i-1] === 'category') return { slug: curr };
        return acc;
    }, { slug: '' });
    return <Component slug={slug} />;
}

const StartHerePage = () => (
    <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-8">New here? Here’s how to use NicheAtlas.</h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">NicheAtlas is built to be an encyclopedia of practical ideas. Whether you're looking to save more, learn a new skill, or optimize your home life, we have a starting point for you.</p>
        <div className="space-y-12">
            <div className="bg-white border p-8 rounded-3xl shadow-sm">
                <h3 className="text-2xl font-bold mb-4">1. Pick a Pillar</h3>
                <p className="text-slate-500 mb-6">We focus on 8 main areas of life. Find the icon that matches your current goal.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PILLARS.map(p => <Link key={p.id} to={`/category/${p.slug}`} className="p-4 border rounded-xl text-center hover:bg-blue-50 transition">{p.icon} {p.name}</Link>)}
                </div>
            </div>
            <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">2. Join the Atlas Digest</h3>
                <p className="mb-6 opacity-90">Every Monday, we send out a curated list of the 5 most practical ideas we discovered that week across all niches.</p>
                <Link to="/newsletter" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-xl font-bold">Subscribe for Free</Link>
            </div>
        </div>
    </div>
);

const NewsletterPage = () => (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <Mail size={64} className="mx-auto text-blue-600 mb-6" />
        <h1 className="text-5xl font-bold mb-4">Join 50,000+ Readers</h1>
        <p className="text-xl text-slate-500 mb-10">Get our weekly "Top 5 Niche Ideas" and exclusive deep dives delivered straight to your inbox.</p>
        <div className="bg-white border p-10 rounded-[3rem] shadow-2xl">
            <form className="space-y-6">
                <div className="text-left">
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-slate-400">Your Interests</label>
                    <div className="grid grid-cols-2 gap-4">
                        {PILLARS.map(p => (
                            <label key={p.id} className="flex items-center p-3 border rounded-xl cursor-pointer hover:bg-slate-50">
                                <input type="checkbox" defaultChecked className="mr-3" />
                                <span className="text-sm font-medium">{p.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 rounded-2xl border bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-xl">Join the Atlas Digest</button>
            </form>
            <p className="mt-6 text-xs text-slate-400">By joining, you agree to our Privacy Policy. You can unsubscribe at any time with one click.</p>
        </div>
    </div>
);

const AboutPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-8">Our Mission</h1>
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            The internet is full of noise. NicheAtlas was founded to be the signal. We publish evergreen, fact-checked, and deeply practical guides that don't expire after a week. 
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
            <div className="p-8 bg-slate-100 rounded-3xl">
                <h3 className="text-xl font-bold mb-4">Editorial Standard</h3>
                <p className="text-slate-500 text-sm">Every piece of content goes through a rigorous checking process. If we suggest a tool or strategy, we've tested it.</p>
            </div>
            <div className="p-8 bg-slate-100 rounded-3xl">
                <h3 className="text-xl font-bold mb-4">Transparency</h3>
                <p className="text-slate-500 text-sm">We are reader-supported. We disclose all affiliate relationships clearly because trust is our only currency.</p>
            </div>
        </div>
        <img src="https://picsum.photos/seed/team/1200/600" alt="Team" className="rounded-3xl mb-12 shadow-xl" />
    </div>
);

const ContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-8 text-center">Contact NicheAtlas</h1>
        <div className="bg-white border rounded-[3rem] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 bg-blue-600 text-white">
                <h3 className="text-3xl font-bold mb-6">Get in touch</h3>
                <p className="mb-8 opacity-80">Whether you have a topic suggestion, a business inquiry, or just want to say hi, we're here.</p>
                <div className="space-y-4">
                    <p className="flex items-center"><Mail size={18} className="mr-3" /> hello@nicheatlas.com</p>
                    <p className="flex items-center"><Send size={18} className="mr-3" /> @nicheatlas on Telegram</p>
                </div>
            </div>
            <div className="p-12">
                <form className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2">Subject</label>
                        <select className="w-full p-4 border rounded-xl bg-slate-50">
                            <option>General Inquiry</option>
                            <option>Suggest a Topic</option>
                            <option>Partnership</option>
                            <option>Report an Issue</option>
                        </select>
                    </div>
                    <textarea placeholder="Your message..." rows={5} className="w-full p-4 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg">Send Message</button>
                </form>
            </div>
        </div>
    </div>
);

const PrivacyPage = () => (
    <div className="max-w-3xl mx-auto px-4 py-20 prose prose-slate">
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2024</p>
        <p>At NicheAtlas, we take your privacy seriously. This policy describes how we collect, use, and protect your information when you visit our site.</p>
        <h2>Information We Collect</h2>
        <ul>
            <li><strong>Personal Data:</strong> Email address for newsletter subscriptions.</li>
            <li><strong>Usage Data:</strong> Anonymous analytics (pages visited, time on site).</li>
            <li><strong>Cookies:</strong> Small files used to improve your experience.</li>
        </ul>
        <h2>Your Rights (GDPR)</h2>
        <p>If you are a resident of the EEA, you have the right to access, rectify, or delete your data. Contact us at privacy@nicheatlas.com.</p>
        <h2>Affiliate Disclosure</h2>
        <p>We participate in various affiliate marketing programs, which means we may get paid commission on sales of those products or services we write about.</p>
    </div>
);

const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
