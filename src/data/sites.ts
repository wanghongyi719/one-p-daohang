export interface StarredInfo {
  isStarred: boolean;
  starredAt: number;
}

export interface Site {
  name: string;
  url: string;
  description?: string;
  favicon?: string;
  starred?: StarredInfo;
}

export interface Category {
  name: string;
  sites: Site[];
}

export const siteData: Category[] = [
  {
    name: "域名查询",
    sites: [
      {
        name: "Lean Domain Search",
        url: "https://leandomainsearch.com",
        description: "域名查询工具",
        favicon: "https://www.google.com/s2/favicons?domain=leandomainsearch.com&sz=128"
      },
      {
        name: "Query Domains",
        url: "https://query.domains",
        description: "域名查询服务",
        favicon: "https://www.google.com/s2/favicons?domain=query.domains&sz=128"
      },
      {
        name: "Instant Domain Search",
        url: "https://instantdomainsearch.com",
        description: "即时域名搜索",
        favicon: "https://www.google.com/s2/favicons?domain=instantdomainsearch.com&sz=128"
      }
    ]
  },
  {
    name: "域名注册",
    sites: [
      {
        name: "Spaceship",
        url: "https://spaceship.com",
        description: "域名注册服务",
        favicon: "https://www.google.com/s2/favicons?domain=spaceship.com&sz=128"
      },
      {
        name: "Porkbun",
        url: "https://porkbun.com",
        description: "域名注册平台",
        favicon: "https://www.google.com/s2/favicons?domain=porkbun.com&sz=128"
      },
      {
        name: "Namecheap",
        url: "https://namecheap.com",
        description: "域名注册与主机服务",
        favicon: "https://www.google.com/s2/favicons?domain=namecheap.com&sz=128"
      }
    ]
  },
  {
    name: "代码&网站托管",
    sites: [
      {
        name: "GitHub",
        url: "https://github.com",
        description: "代码托管平台",
        favicon: "https://www.google.com/s2/favicons?domain=github.com&sz=128"
      },
      {
        name: "Cloudflare",
        url: "https://cloudflare.com",
        description: "网站加速与托管服务",
        favicon: "https://www.google.com/s2/favicons?domain=cloudflare.com&sz=128"
      },
      {
        name: "Vercel",
        url: "https://vercel.com",
        description: "前端部署平台",
        favicon: "https://www.google.com/s2/favicons?domain=vercel.com&sz=128"
      }
    ]
  },
  {
    name: "数据后台",
    sites: [
      {
        name: "Google Search Console",
        url: "https://search.google.com/search-console",
        description: "Google站长工具",
        favicon: "https://www.google.com/s2/favicons?domain=search.google.com&sz=128"
      },
      {
        name: "Google Analytics",
        url: "https://analytics.google.com/analytics/web",
        description: "Google数据分析",
        favicon: "https://www.google.com/s2/favicons?domain=analytics.google.com&sz=128"
      },
      {
        name: "Bing Webmaster",
        url: "https://www.bing.com/webmasters/submiturl",
        description: "Bing站长工具",
        favicon: "https://www.google.com/s2/favicons?domain=www.bing.com&sz=128"
      }
    ]
  }
]; 