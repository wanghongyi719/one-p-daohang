interface StarredSites {
  [key: string]: {
    isStarred: boolean;
    starredAt: number;
  };
}

const STORAGE_KEY = 'starred_sites';

export const getStarredSites = (): StarredSites => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading starred sites:', error);
    return {};
  }
};

export const setStarredSites = (sites: StarredSites): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
  } catch (error) {
    console.error('Error saving starred sites:', error);
  }
};

export const toggleSiteStarred = (url: string): StarredSites => {
  const sites = getStarredSites();
  
  if (sites[url]?.isStarred) {
    delete sites[url];
  } else {
    sites[url] = {
      isStarred: true,
      starredAt: Date.now()
    };
  }
  
  setStarredSites(sites);
  return sites;
}; 