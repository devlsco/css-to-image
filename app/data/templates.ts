import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'welcome',
    name: 'Welcome Banner',
    category: 'banners',
    code: `<div class="flex min-w-[500px] min-h-[300px] flex-col items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 p-8">
  <div class="text-4xl font-bold text-white mb-4">Welcome!</div>
  <div class="bg-white/20 px-6 py-3 rounded-full">
    <span class="text-white text-lg">Create beautiful images from CSS</span>
  </div>
</div>`
  },
  {
    id: 'card',
    name: 'Profile Card',
    category: 'cards',
    code: `<div class="bg-gray-900 rounded-lg p-6 max-w-sm">
  <div class="flex items-center space-x-4">
    <div class="rounded-full bg-gray-700 w-16 h-16"></div>
    <div>
      <h3 class="text-xl font-bold text-white">John Doe</h3>
      <p class="text-emerald-400">Software Engineer</p>
    </div>
  </div>
</div>`
  },
  {
    id: 'gradient-card',
    name: 'Gradient Card',
    category: 'cards',
    code: `<div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-8 max-w-sm">
  <h2 class="text-2xl font-bold text-white mb-4">Beautiful Design</h2>
  <p class="text-white/90">Transform your ideas into stunning visuals.</p>
</div>`
  },
  {
    id: 'social-card',
    name: 'Social Card',
    category: 'social',
    code: `<div class="bg-gray-900 rounded-lg p-6 max-w-md">
  <div class="flex items-center space-x-4">
    <div class="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
    <div>
      <h3 class="text-lg font-bold text-white">Social Preview</h3>
      <p class="text-blue-400">@username</p>
    </div>
  </div>
</div>`
  },
  {
    id: 'feature-card',
    name: 'Feature Card',
    category: 'cards',
    code: `<div class="bg-gray-900 rounded-lg p-8 max-w-sm">
  <div class="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white text-xl">✨</div>
  <h3 class="text-xl font-bold text-white mb-2">Amazing Feature</h3>
  <p class="text-gray-400">Discover the power of our amazing features.</p>
</div>`
  },
  {
    id: 'stat-card',
    name: 'Statistics Card',
    category: 'cards',
    code: `<div class="bg-gray-900 rounded-lg p-6 max-w-sm">
  <div class="text-3xl font-bold text-white mb-2">2,500+</div>
  <div class="text-emerald-400 font-medium mb-4">Active Users</div>
  <div class="text-gray-400">Growing community of developers</div>
</div>`
  }
];
