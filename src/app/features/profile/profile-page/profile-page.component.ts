import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  coverImage: string;
  followers: number;
  following: number;
  videosCount: number;
  likesCount: number;
  isFollowing: boolean;
  verified: boolean;
}

interface Video {
  id: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  title: string;
}

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  activeTab: 'videos' | 'likes' | 'saved' = 'videos';
  showStatModal = false;
  selectedStatType: 'followers' | 'following' | 'likes' | null = null;
  
  userProfile: UserProfile = {
    id: '1',
    username: '@jamel_creator',
    displayName: 'Jamel',
    bio: '🎬 Content Creator | 💡 Digital Enthusiast | 🌍 Living Life',
    avatar: 'https://i.pravatar.cc/150?img=1',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=400&fit=crop',
    followers: 25400,
    following: 1250,
    videosCount: 158,
    likesCount: 2450,
    isFollowing: false,
    verified: true
  };

  videos: Video[] = [
    {
      id: '1',
      thumbnail: 'https://picsum.photos/200/300?random=1',
      likes: 5400,
      comments: 234,
      shares: 120,
      title: 'Amazing video 1'
    },
    {
      id: '2',
      thumbnail: 'https://picsum.photos/200/300?random=2',
      likes: 3200,
      comments: 156,
      shares: 89,
      title: 'Cool content'
    },
    {
      id: '3',
      thumbnail: 'https://picsum.photos/200/300?random=3',
      likes: 7800,
      comments: 456,
      shares: 234,
      title: 'Trending video'
    },
    {
      id: '4',
      thumbnail: 'https://picsum.photos/200/300?random=4',
      likes: 4100,
      comments: 312,
      shares: 145,
      title: 'Viral moment'
    },
    {
      id: '5',
      thumbnail: 'https://picsum.photos/200/300?random=5',
      likes: 2900,
      comments: 189,
      shares: 78,
      title: 'Latest upload'
    },
    {
      id: '6',
      thumbnail: 'https://picsum.photos/200/300?random=6',
      likes: 6300,
      comments: 389,
      shares: 198,
      title: 'Fan favorite'
    }
  ];

  likedVideos: Video[] = [
    {
      id: '7',
      thumbnail: 'https://picsum.photos/200/300?random=7',
      likes: 12500,
      comments: 789,
      shares: 445,
      title: 'Liked video 1'
    },
    {
      id: '8',
      thumbnail: 'https://picsum.photos/200/300?random=8',
      likes: 8900,
      comments: 523,
      shares: 312,
      title: 'Liked video 2'
    }
  ];

  ngOnInit(): void {
    // Initialize profile data
  }

  toggleFollow(): void {
    this.userProfile.isFollowing = !this.userProfile.isFollowing;
  }

  shareProfile(): void {
    console.log('Sharing profile...');
  }

  sendMessage(): void {
    console.log('Opening message...');
  }

  suggestProfile(): void {
    console.log('Suggesting profile...');
  }

  editProfile(): void {
    console.log('Editing profile...');
  }

  getDisplayVideos(): Video[] {
    switch (this.activeTab) {
      case 'videos':
        return this.videos;
      case 'likes':
        return this.likedVideos;
      case 'saved':
        return this.videos.slice(0, 3);
      default:
        return this.videos;
    }
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  openStatModal(statType: 'followers' | 'following' | 'likes'): void {
    this.selectedStatType = statType;
    this.showStatModal = true;
  }

  closeStatModal(): void {
    this.showStatModal = false;
    this.selectedStatType = null;
  }
}
