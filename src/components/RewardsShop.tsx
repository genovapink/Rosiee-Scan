import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Gift, Star, Award, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User } from '../App';
import rosyLogo from 'figma:asset/Rosy.png';

interface RewardsShopProps {
  user: User;
  updateUser: (updates: Partial<User>) => void;
}

interface Reward {
  id: string;
  name: string;
  points: number;
  type: 'sticker' | 'nft' | 'badge';
  description: string;
  image: string;
  icon: React.ReactNode;
}

const rewards: Reward[] = [
  {
    id: 'sticker',
    name: 'Stiker Rosy',
    points: 150,
    type: 'sticker',
    description: 'Stiker digital Rosy yang lucu untuk koleksi Anda',
    image: 'https://i.pinimg.com/736x/70/6c/23/706c23d93e1d1a2a02eebdf630979570.jpg',
    icon: <Star className="w-6 h-6" />,
  },
  {
    id: 'nft-hogwarts',
    name: 'NFT Rosy Hogwarts',
    points: 300,
    type: 'nft',
    description: 'NFT eksklusif Rosy edisi Hogwarts',
    image: 'https://i.pinimg.com/736x/70/6c/23/706c23d93e1d1a2a02eebdf630979570.jpg',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 'nft-painting',
    name: 'NFT Rosy Painting',
    points: 300,
    type: 'nft',
    description: 'NFT eksklusif Rosy edisi Painting',
    image: 'https://i.pinimg.com/736x/cd/c4/b4/cdc4b42ad80b7f15a4696de617e9493f.jpg',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 'nft-cooking',
    name: 'NFT Rosy Cooking',
    points: 300,
    type: 'nft',
    description: 'NFT eksklusif Rosy edisi Cooking',
    image: 'https://i.pinimg.com/736x/05/82/c5/0582c5c15ad28af544003f62b33b6ed8.jpg',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 'nft-coding',
    name: 'NFT Rosy Coding',
    points: 300,
    type: 'nft',
    description: 'NFT eksklusif Rosy edisi Coding',
    image: 'https://i.pinimg.com/736x/53/0a/9a/530a9adc889fa4856ccd11bdf7d8cc11.jpg',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 'nft-reading',
    name: 'NFT Rosy Reading',
    points: 300,
    type: 'nft',
    description: 'NFT eksklusif Rosy edisi Reading',
    image: 'https://i.pinimg.com/736x/10/de/3d/10de3da9fbaab133c488dca6a08dddfd.jpg',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 'badge-warrior',
    name: 'Badge Eco-Warrior',
    points: 320,
    type: 'badge',
    description: 'Badge eksklusif untuk pejuang lingkungan sejati',
    image: 'https://i.pinimg.com/736x/70/6c/23/706c23d93e1d1a2a02eebdf630979570.jpg',
    icon: <Award className="w-6 h-6" />,
  },
];

export default function RewardsShop({ user, updateUser }: RewardsShopProps) {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRedeem = () => {
    if (!selectedReward) return;

    if (user.points < selectedReward.points) {
      toast.error('Poin Anda tidak cukup! 😢');
      return;
    }

    // Check if user already has this reward
    if (selectedReward.type === 'nft' && user.nfts.includes(selectedReward.id)) {
      toast.error('Anda sudah memiliki NFT ini!');
      return;
    }
    if (selectedReward.type === 'badge' && user.badges.includes(selectedReward.id)) {
      toast.error('Anda sudah memiliki badge ini!');
      return;
    }

    // Redeem the reward
    const updates: Partial<User> = {
      points: user.points - selectedReward.points,
    };

    if (selectedReward.type === 'nft') {
      updates.nfts = [...user.nfts, selectedReward.id];
    } else if (selectedReward.type === 'badge') {
      updates.badges = [...user.badges, selectedReward.id];
    }

    updateUser(updates);
    toast.success(`🎉 ${selectedReward.name} berhasil ditukar! 🎊`);
    setShowConfirm(false);
    setSelectedReward(null);
  };

  const hasReward = (reward: Reward) => {
    if (reward.type === 'nft') return user.nfts.includes(reward.id);
    if (reward.type === 'badge') return user.badges.includes(reward.id);
    return false;
  };

  return (
    <div className="min-h-screen p-4 pt-6 pb-24">
      {/* Header with Logo */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-3">
          <img src={rosyLogo} alt="Rosy" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
        <h1 className="text-emerald-600 mb-2 flex items-center justify-center gap-2">
          <Gift className="w-5 h-5" />
          Rewards Shop
        </h1>
        <p className="text-gray-600">Tukar poin Anda dengan hadiah menarik! </p>
      </div>

      {/* Points Card */}
      <Card className="max-w-md mx-auto p-6 mb-6 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-3xl shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/90 mb-1"> Poin Anda</p>
            <p className="text-white">{user.points} Poin</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Gift className="w-8 h-8 text-white" />
          </div>
        </div>
      </Card>

      {/* Rewards Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => {
            const owned = hasReward(reward);
            const canAfford = user.points >= reward.points;

            return (
              <Card
                key={reward.id}
                className={`p-4 rounded-3xl shadow-lg transition-all ${
                  owned ? 'bg-gray-50 border-2 border-gray-300' : 'hover:shadow-xl'
                }`}
              >
                <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden mb-4 relative">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-full object-cover"
                  />
                  {owned && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <div className="bg-white rounded-full p-4 shadow-xl">
                        <Award className="w-10 h-10 text-emerald-600" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-emerald-600">{reward.icon}</div>
                      <h3 className="text-gray-900">{reward.name}</h3>
                    </div>
                    <p className="text-gray-600">{reward.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-2xl">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-900">{reward.points} Poin</span>
                    </div>
                    {owned ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        ✓ Dimiliki
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        disabled={!canAfford}
                        onClick={() => {
                          setSelectedReward(reward);
                          setShowConfirm(true);
                        }}
                        className={`rounded-2xl ${
                          canAfford 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' 
                            : ''
                        }`}
                      >
                        Tukar 
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" />
              Konfirmasi Penukaran
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menukar <strong>{selectedReward?.points} poin</strong> dengan{' '}
              <strong>{selectedReward?.name}</strong>? 
            </DialogDescription>
          </DialogHeader>

          {selectedReward && (
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
                <img
                  src={selectedReward.image}
                  alt={selectedReward.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-4">
                <p className="text-emerald-800">
                   Sisa poin setelah penukaran: <strong>{user.points - selectedReward.points}</strong>
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-2xl border-2"
                  onClick={() => setShowConfirm(false)}
                >
                  Batal
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-2xl"
                  onClick={handleRedeem}
                >
                  Tukar Sekarang 
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}