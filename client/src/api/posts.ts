import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllComps = async (sort?: 'mostLiked' | 'recent', user?: { username: string, token: string }) => {
  const { data: comps } = await axios.get(`${API_URL}/comps`, { params: { sort } });

  if (user) {
    const [{ data: likedComps }, { data: bookmarkedComps }] = await Promise.all([
      axios.get(`${API_URL}/users/${user.username}/liked`, { headers: { Authorization: `Bearer ${user.token}` } }),
      axios.get(`${API_URL}/users/${user.username}/bookmarks`, { headers: { Authorization: `Bearer ${user.token}` } }),
    ]);

    const likedIds = new Set(likedComps.map((c: any) => c._id));
    const bookmarkedIds = new Set(bookmarkedComps.map((c: any) => c._id));
    return comps.map((c: any) => ({ ...c, liked: likedIds.has(c._id), bookmarked: bookmarkedIds.has(c._id)}));
  }

  return comps.map((c: any) => ({ ...c, liked: false, bookmarked: false }));
};

export const getMyComps = async (username: string, token: string) => {
  const { data } = await axios.get(`${API_URL}/users/${username}/mycomps`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}

export const createComp = async (
  username: string,
  token: string,
  comp: {
    title: string;
    champions: {
      championName: string;
      position?: { row: number; col: number };
    }[];
    tips: string;
    howToTransition: string;
  }
) => {
  const { data } = await axios.post(`${API_URL}/users/${username}/mycomps`,
    comp,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}

export const getBookmarks = async (username: string, token: string) => {
  const [{ data: comps }, { data: likedComps }] = await Promise.all([
    axios.get(`${API_URL}/users/${username}/bookmarks`, { headers: { Authorization: `Bearer ${token}` } }),
    axios.get(`${API_URL}/users/${username}/liked`, { headers: { Authorization: `Bearer ${token}` } }),
  ]);
  const likedIds = new Set(likedComps.map((c: any) => c._id));
  return comps.map((c: any) => ({ ...c, liked: likedIds.has(c._id), bookmarked: true }));
};

export const toggleLike = async (compId: string, username: string, token: string) => {
  const { data } = await axios.post(`${API_URL}/users/${username}/comps/${compId}/liked/`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}

export const toggleBookmark = async (compId: string, username: string, token: string) => {
  const { data } = await axios.post(`${API_URL}/users/${username}/comps/${compId}/bookmarks/`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}

export const postComment = async (compId: string, username: string, content: string, token: string) => {
  const { data } = await axios.post(`${API_URL}/users/${username}/comps/${compId}/comments`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}
