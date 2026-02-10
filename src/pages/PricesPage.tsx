import React, { useEffect, useState } from 'react';
import { Search, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoPrice } from '../lib/types';
export function PricesPage() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setPrices(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);
  const filteredPrices = prices.filter(
    (coin) =>
    coin.name?.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold font-display mb-2">
              Live <span className="text-neon-green">Market Data</span>
            </h1>
            <p className="text-gray-400 flex items-center">
              Real-time prices from global exchanges.
              <span className="ml-4 text-xs bg-white/5 px-2 py-1 rounded text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search coin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-neon-green transition-colors" />

            </div>
            <button
              onClick={fetchPrices}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-neon-green transition-colors"
              title="Refresh">

              <RefreshCw
                className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />

            </button>
          </div>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 text-left">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                    24h Change
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right hidden md:table-cell">
                    Market Cap
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right hidden lg:table-cell">
                    Volume (24h)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && prices.length === 0 ?
                [...Array(10)].map((_, i) =>
                <tr key={i} className="animate-pulse">
                        <td className="px-6 py-4">
                          <div className="h-8 bg-white/5 rounded w-32"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-6 bg-white/5 rounded w-20 ml-auto"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-6 bg-white/5 rounded w-16 ml-auto"></div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="h-6 bg-white/5 rounded w-24 ml-auto"></div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="h-6 bg-white/5 rounded w-24 ml-auto"></div>
                        </td>
                      </tr>
                ) :
                filteredPrices.map((coin) =>
                <tr
                  key={coin.id}
                  className="hover:bg-white/5 transition-colors">

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full mr-3" />

                            <div>
                              <div className="font-bold text-white">
                                {coin.name}
                              </div>
                              <div className="text-xs text-gray-500 uppercase">
                                {coin.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-white">
                          ${coin.current_price?.toLocaleString() ?? '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div
                      className={`flex items-center justify-end ${(coin.price_change_percentage_24h ?? 0) >= 0 ? 'text-neon-green' : 'text-neon-pink'}`}>

                            {(coin.price_change_percentage_24h ?? 0) >= 0 ?
                      <TrendingUp className="w-4 h-4 mr-1" /> :

                      <TrendingDown className="w-4 h-4 mr-1" />
                      }
                            {Math.abs(
                        coin.price_change_percentage_24h ?? 0
                      ).toFixed(2)}
                            %
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400 hidden md:table-cell">
                          ${coin.market_cap?.toLocaleString() ?? '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400 hidden lg:table-cell">
                          ${coin.total_volume?.toLocaleString() ?? '—'}
                        </td>
                      </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredPrices.length === 0 && !loading &&
          <div className="p-12 text-center text-gray-400">
              No assets found matching "{search}"
            </div>
          }
        </div>
      </div>
    </div>);

}