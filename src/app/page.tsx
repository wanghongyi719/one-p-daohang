'use client';

import { useState, useEffect } from 'react';
import { siteData } from '@/data/sites';
import Image from 'next/image';
import { getStarredSites, toggleSiteStarred } from '@/utils/storage';
import type { StarredInfo } from '@/data/sites';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [starredSites, setStarredSites] = useState<{[key: string]: StarredInfo}>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 初始化时加载置顶状态
    setStarredSites(getStarredSites());
  }, []);

  const handleStarClick = (url: string) => {
    const newStarredSites = toggleSiteStarred(url);
    setStarredSites(newStarredSites);
  };

  const sortSites = (sites: any[]) => {
    return [...sites].sort((a, b) => {
      const aStarred = starredSites[a.url];
      const bStarred = starredSites[b.url];
      
      if (aStarred && !bStarred) return -1;
      if (!aStarred && bStarred) return 1;
      if (aStarred && bStarred) {
        return bStarred.starredAt - aStarred.starredAt;
      }
      return 0;
    });
  };

  const filteredData = siteData.map(category => ({
    ...category,
    sites: sortSites(
      category.sites.filter(site => 
        site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
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
                    className="site-card group block p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl relative"
                  >
                    {/* 星标按钮 */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleStarClick(site.url);
                      }}
                      className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
                    >
                      {starredSites[site.url]?.isStarred ? (
                        <svg
                          className="w-5 h-5 text-yellow-400 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-yellow-400 stroke-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      )}
                    </button>

                    <div className="flex items-start space-x-4">
                      {site.favicon && (
                        <div className="flex-shrink-0 w-8 h-8 relative">
                          <Image
                            src={site.favicon}
                            alt={`${site.name} 图标`}
                            width={32}
                            height={32}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-medium text-gray-900 group-hover:text-blue-600 truncate">
                          {site.name}
                        </h3>
                        {site.description && (
                          <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                            {site.description}
                          </p>
                        )}
                      </div>
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
