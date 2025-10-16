// components/learning/ResourceSection.jsx
import React from 'react';
import { Video, PlayCircle, Calendar, User, ExternalLink, Youtube, BookOpen } from 'lucide-react';

const ResourceSection = ({ resources, topic }) => {
  const videos = resources[topic] || [];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getChannelIcon = (channel) => {
    const icons = {
      'CodeWithHarry': '👨‍💻',
      'Telusko': '🎓',
      'CareerRide': '🚗',
      'Harshit Trehan': '⚡',
      'default': '📺'
    };
    return icons[channel] || icons.default;
  };

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-white/20 dark:border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-purple-200/50 dark:border-purple-800/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg shadow-purple-500/30">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Curated Learning Resources
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Nova has curated these high-quality videos to supplement your learning on{' '}
              <span className="font-semibold text-purple-600 dark:text-purple-400">{topic}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="p-8">
        {videos.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, idx) => (
              <a
                key={idx}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white dark:bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 overflow-hidden">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Youtube className="w-16 h-16 text-purple-400 dark:text-purple-600" />
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-10 h-10 text-purple-600 fill-current" />
                    </div>
                  </div>
                  
                  {/* External Link Badge */}
                  <div className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getChannelIcon(video.channel)}</span>
                      <span className="font-medium">{video.channel}</span>
                    </div>
                  </div>
                  
                  {video.upload_date && (
                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(video.upload_date)}</span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 dark:bg-purple-950/30 rounded-full mb-4">
              <BookOpen className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Videos Available
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Nova couldn't find relevant videos for this topic at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceSection;
