const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_URL;
    this.token = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  setTokens(accessToken, refreshToken) {
    this.token = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Handle 401 - try to refresh token
      if (response.status === 401 && this.refreshToken && !endpoint.includes('/auth/refresh')) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry the original request with new token
          config.headers.Authorization = `Bearer ${this.token}`;
          const retryResponse = await fetch(url, config);
          return await retryResponse.json();
        } else {
          // Refresh failed, clear tokens and redirect to login
          this.clearTokens();
          window.location.href = '/login';
          return null;
        }
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async refreshAccessToken() {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        this.setTokens(data.data.accessToken, data.data.refreshToken);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }

  // Authentication endpoints
  async requestOtp(email) {
    return this.request('/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOtp(email, otp, name) {
    const data = await this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp, ...(name && { name }) }),
    });

    if (data?.success) {
      this.setTokens(data.data.accessToken, data.data.refreshToken);
    }

    return data;
  }

  async logout() {
    if (this.refreshToken) {
      await this.request('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });
    }
    this.clearTokens();
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Membership endpoints
  async joinTesseract(metadata = {}) {
    return this.request('/members/join', {
      method: 'POST',
      body: JSON.stringify({ metadata }),
    });
  }

  async getMembership() {
    return this.request('/members/me');
  }

  // Dashboard endpoints
  async getDashboard(activityLimit = 20) {
    return this.request(`/users/me/dashboard?activityLimit=${activityLimit}`);
  }

  // Events endpoints
  async getEvents(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/events?${query}`);
  }

  async getEvent(id) {
    return this.request(`/events/${id}`);
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async updateEvent(id, eventData) {
    return this.request(`/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(eventData),
    });
  }

  async joinEvent(id) {
    return this.request(`/events/${id}/join`, {
      method: 'POST',
    });
  }

  async getEventParticipants(id, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/events/${id}/participants?${query}`);
  }

  // Games endpoints
  async getGames(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/games?${query}`);
  }

  async getGame(id) {
    return this.request(`/games/${id}`);
  }

  async createGame(gameData) {
    return this.request('/games', {
      method: 'POST',
      body: JSON.stringify(gameData),
    });
  }

  async submitGameScore(gameId, scoreData) {
    return this.request(`/games/${gameId}/scores`, {
      method: 'POST',
      body: JSON.stringify(scoreData),
    });
  }

  async getGameScores(gameId, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/games/${gameId}/scores?${query}`);
  }

  // Leaderboard endpoints
  async getGlobalLeaderboard(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/leaderboard/global?${query}`);
  }

  async getGameLeaderboard(gameId, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/leaderboard/game/${gameId}?${query}`);
  }

  // Admin endpoints
  async getAdminStats() {
    return this.request('/admin/stats');
  }

  async getUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/admin/users?${query}`);
  }

  async updateUserRole(userId, role) {
    return this.request(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }

  async deleteUser(userId) {
    return this.request(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async getAdminActivity(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/admin/activity?${query}`);
  }

  // Activity endpoints
  async getActivity(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/activity?${query}`);
  }

  async getMyActivity(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/activity/me?${query}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService;
