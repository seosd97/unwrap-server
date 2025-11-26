import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { LRUCache } from 'lru-cache';

export class SpotifyClient {
  private static instances = new LRUCache<string, SpotifyApi>({
    max: 100,
    ttl: 1000 * 60 * 60,
    updateAgeOnGet: true,
    updateAgeOnHas: false,
  });

  static create(accessToken: string): SpotifyApi {
    if (!accessToken) {
      throw new Error('Access token is required');
    }

    const cached = this.instances.get(accessToken);
    if (cached) {
      return cached;
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    if (!clientId) {
      throw new Error('SPOTIFY_CLIENT_ID is not configured');
    }

    const client = SpotifyApi.withAccessToken(clientId, {
      access_token: accessToken,
    } as any);

    this.instances.set(accessToken, client);

    return client;
  }

  static clearCache(): void {
    this.instances.clear();
  }

  static removeCached(accessToken: string): void {
    this.instances.delete(accessToken);
  }

  static getCacheStats(): { size: number; max: number; ttl: number } {
    return {
      size: this.instances.size,
      max: this.instances.max,
      ttl: this.instances.ttl,
    };
  }
}
