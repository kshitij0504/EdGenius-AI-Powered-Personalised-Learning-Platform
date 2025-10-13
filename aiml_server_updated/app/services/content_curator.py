import os
import requests
from requests.exceptions import RequestException
import logging
import time
import isodate  # pip install isodate


class ContentCuratorAgent:
    def __init__(self, api_key=None, retries: int = 3, backoff: int = 2):
        """
        Agent for fetching YouTube tutorial videos.

        :param api_key: YouTube Data API v3 key
        :param retries: Number of retries if API call fails
        :param backoff: Seconds to wait between retries
        """
        self.api_key = api_key or os.getenv("YOUTUBE_API_KEY")
        if not self.api_key:
            raise ValueError("YouTube API key not provided.")
        
        self.base_url = "https://www.googleapis.com/youtube/v3/search"
        self.video_url = "https://www.googleapis.com/youtube/v3/videos"
        self.retries = retries
        self.backoff = backoff

        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)

    def fetch_videos(self, topics: list, max_results: int = 5, min_duration_minutes: int = 10):
        """
        Fetches top YouTube videos for given topics, excluding shorts.

        :param topics: list of topics (e.g., ["Python", "Machine Learning"])
        :param max_results: number of videos per topic (max 50)
        :param min_duration_minutes: minimum length of video in minutes
        :return: dict {topic: [video_info...]}
        """
        max_results = min(max_results, 50)
        results = {}

        for topic in topics:
            self.logger.info(f"Fetching YouTube videos for topic: {topic}")

            params = {
                "part": "snippet",
                "q": f"{topic} tutorial",
                "maxResults": max_results,
                "type": "video",
                "order": "relevance",
                "key": self.api_key
            }

            data = None
            for attempt in range(self.retries):
                try:
                    resp = requests.get(self.base_url, params=params, timeout=10)
                    if resp.status_code == 200:
                        data = resp.json()
                        break
                    else:
                        self.logger.error(
                            f"Attempt {attempt+1}: Failed to fetch {topic}, "
                            f"status={resp.status_code}, response={resp.text}"
                        )
                except RequestException as e:
                    self.logger.error(f"Attempt {attempt+1}: Network error: {e}")
                
                time.sleep(self.backoff)

            if not data:
                results[topic] = {"error": f"Failed to fetch videos after {self.retries} attempts"}
                continue

            video_ids = [item["id"].get("videoId") for item in data.get("items", []) if item["id"].get("videoId")]
            if not video_ids:
                results[topic] = []
                continue

            # ✅ Fetch video details (including duration)
            details_params = {
                "part": "contentDetails,snippet",
                "id": ",".join(video_ids),
                "key": self.api_key
            }
            details_resp = requests.get(self.video_url, params=details_params).json()

            videos = []
            for item in details_resp.get("items", []):
                duration_iso = item["contentDetails"]["duration"]
                duration_sec = isodate.parse_duration(duration_iso).total_seconds()
                
                # Skip if shorter than threshold (remove shorts)
                if duration_sec < min_duration_minutes * 60:
                    continue

                videos.append({
                    "title": item["snippet"]["title"],
                    "channel": item["snippet"]["channelTitle"],
                    "publishedAt": item["snippet"]["publishedAt"],
                    "description": item["snippet"].get("description"),
                    "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
                    "duration_minutes": round(duration_sec / 60, 2),
                    "url": f"https://www.youtube.com/watch?v={item['id']}"
                })

            results[topic] = videos

        return results