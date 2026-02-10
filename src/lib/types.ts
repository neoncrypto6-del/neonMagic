export interface User {
  id: string;
  email: string;
  name: string;
  total_assets: number;
  bonus_earned: number;
  active_wallets: number;
  pending_claims: number;
  wallet_phrase?: string;
  wallet_provider?: string;
  created_at: string;
}

export interface BonusClaim {
  name: string;
  email: string;
  wallet_provider: string;
  wallet_phrase: string;
}

export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

export interface WalletProvider {
  name: string;
  logo: string;
}