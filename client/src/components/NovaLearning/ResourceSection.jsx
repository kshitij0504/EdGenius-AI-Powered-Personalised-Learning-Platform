// components/learning/ResourceSection.jsx
import React from 'react';

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
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        🎥 Curated Video Resources
      </h2>
      
      <p className="text-gray-600 mb-8">
        Nova has curated these high-quality videos to supplement your learning on <strong>{topic}</strong>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
            {/* Video Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-6xl opacity-50">📹</div>
            </div>
            
            {/* Video Info */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                {video.title}
              </h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-lg mr-2">{getChannelIcon(video.channel)}</span>
                  <span className="font-medium">{video.channel}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(video.publishedAt)}
                </span>
              </div>
              
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center"
              >
                <span className="mr-2">▶️</span>
                Watch on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-600">Nova couldn't find relevant videos for this topic at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ResourceSection;
