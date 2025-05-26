'use client';

import { useState, useEffect } from 'react';
import { siteData } from '@/data/sites';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredData = siteData.map(category => ({
    ...category,
    sites: category.sites.filter(site => 
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.sites.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 固定头部 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-4xl font-bold text-center category-title">AI-Web应用上站导航</h1>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* 搜索区域 */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索网站..."
              className="w-full px-6 py-4 text-lg rounded-2xl border-0 bg-white shadow-lg focus:ring-2 focus:ring-black/5 outline-none search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 分类展示区域 */}
        <div className="max-w-7xl mx-auto space-y-16">
          {filteredData.map((category) => (
            <section key={category.name} className="space-y-8">
              <h2 className="text-3xl font-semibold category-title px-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {category.sites.map((site) => (
                  <a
                    key={site.url}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-card group block p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 group-hover:text-blue-600">
                          {site.name}
                        </h3>
                        {site.description && (
                          <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                            {site.description}
                          </p>
                        )}
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>WHY © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
