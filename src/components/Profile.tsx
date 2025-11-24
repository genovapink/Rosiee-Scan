import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User as UserIcon, Mail, Star, Award, LogOut, Sparkles } from 'lucide-react';
import type { User } from '../App';
import rosyLogo from 'figma:asset/Rosy.png';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const nftData: Record<string, { name: string; image: string }> = {
  'nft-hogwarts': {
    name: 'Rosy Hogwarts',
    image: 'https://i.pinimg.com/736x/70/6c/23/706c23d93e1d1a2a02eebdf630979570.jpg',
  },
  'nft-painting': {
    name: 'Rosy Painting',
    image: 'https://i.pinimg.com/736x/cd/c4/b4/cdc4b42ad80b7f15a4696de617e9493f.jpg',
  },
  'nft-cooking': {
    name: 'Rosy Cooking',
    image: 'https://i.pinimg.com/736x/05/82/c5/0582c5c15ad28af544003f62b33b6ed8.jpg',
  },
  'nft-coding': {
    name: 'Rosy Coding',
    image: 'https://i.pinimg.com/736x/53/0a/9a/530a9adc889fa4856ccd11bdf7d8cc11.jpg',
  },
  'nft-reading': {
    name: 'Rosy Reading',
    image: 'https://i.pinimg.com/736x/10/de/3d/10de3da9fbaab133c488dca6a08dddfd.jpg',
  },
};

export default function Profile({ user, onLogout }: ProfileProps) {
  return (
    <div className="min-h-screen p-4 pt-6 pb-24">
      {/* Header with Logo */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-3">
          <img src={rosyLogo} alt="Rosy" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
        <h1 className="text-emerald-600 mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          Profil Saya
        </h1>
        <p className="text-gray-600">Lihat progres dan koleksi Anda </p>
      </div>

      {/* Profile Card */}
      <Card className="max-w-md mx-auto p-6 mb-6 rounded-3xl shadow-xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white shadow-lg">
            <UserIcon className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900 mb-1">{user.name} </h2>
            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <Mail className="w-4 h-4" />
              <span className="text-gray-600">{user.email}</span>
            </div>
            {user.badges.includes('badge-warrior') && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                <Award className="w-3 h-3 mr-1" />
                Eco-Warrior 
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-2xl">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-gray-900 mb-1">{user.points}</p>
            <p className="text-gray-600">Poin</p>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-gray-900 mb-1">{user.nfts.length}</p>
            <p className="text-gray-600">NFT</p>
          </div>
          <div className="text-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-2xl">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Award className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="text-gray-900 mb-1">{user.deposits}</p>
            <p className="text-gray-600">Setoran</p>
          </div>
        </div>
      </Card>

      {/* NFT Collection */}
      {user.nfts.length > 0 && (
        <div className="max-w-md mx-auto mb-6">
          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Koleksi NFT Rosy 
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {user.nfts.map((nftId) => {
              const nft = nftData[nftId];
              if (!nft) return null;

              return (
                <Card key={nftId} className="overflow-hidden rounded-3xl shadow-lg">
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                        <Sparkles className="w-3 h-3 mr-1" />
                        NFT
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50">
                    <p className="text-gray-900 text-center">{nft.name}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {user.nfts.length === 0 && (
        <Card className="max-w-md mx-auto p-8 text-center mb-6 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50">
          <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Belum Ada NFT </h3>
          <p className="text-gray-600 mb-4">
            Kumpulkan poin dan tukar dengan NFT eksklusif Rosy di Rewards Shop!
          </p>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl">
            <p>
              NFT mulai dari <strong>300 poin</strong> 
            </p>
          </div>
        </Card>
      )}

      {/* Badges */}
      {user.badges.length > 0 && (
        <div className="max-w-md mx-auto mb-6">
          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" />
            Badges 
          </h2>
          <Card className="p-4 rounded-3xl shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="flex flex-wrap gap-2">
              {user.badges.includes('badge-warrior') && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-2 shadow-lg">
                  <Award className="w-4 h-4 mr-2" />
                  Eco-Warrior 
                </Badge>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Achievement Progress */}
      <Card className="max-w-md mx-auto p-6 mb-6 rounded-3xl shadow-xl">
        <h2 className="text-gray-900 mb-4">Progress Pencapaian </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600"> Stiker Rosy</span>
              <span className="text-emerald-600">{user.points}/150</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all"
                style={{ width: `${Math.min((user.points / 150) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600"> NFT Rosy</span>
              <span className="text-purple-600">{user.points}/300</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                style={{ width: `${Math.min((user.points / 300) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600"> Badge Eco-Warrior</span>
              <span className="text-yellow-600">{user.points}/320</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all"
                style={{ width: `${Math.min((user.points / 320) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <div className="max-w-md mx-auto">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-2xl"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Keluar 
        </Button>
      </div>
    </div>
  );
}