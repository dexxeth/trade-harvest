from flask import Flask, jsonify
from flask_cors import CORS
import feedparser
import re

app = Flask(__name__)
CORS(app)

@app.route('/api/rss', methods=['GET'])
def get_news():
    feed_urls = [
        'https://eng.ruralvoice.in/rss/latest-posts', 
        'https://eng.ruralvoice.in/rss/category/agri-start-ups', 
        'https://www.usda.gov/rss/latest-releases.xml'
    ]
    
    news_items = []
    
    for feed_url in feed_urls:
        feed = feedparser.parse(feed_url)
        
        for entry in feed.entries:
            news_item = {
                'source': entry.source.title if 'source' in entry else 'Unknown',
                'title': entry.title,
                'link': entry.link,
                'published': entry.published if 'published' in entry else None,
                'image': None,
                'description': None
            }
            
            if 'media_content' in entry and len(entry.media_content) > 0:
                news_item['image'] = entry.media_content[0]['url']
            
            elif 'media_thumbnail' in entry and len(entry.media_thumbnail) > 0:
                news_item['image'] = entry.media_thumbnail[0]['url']
            
            elif 'description' in entry:
              
                img_search = re.search(r'<img.*?src=["\'](.*?)["\']', entry.description)
                if img_search:
                    news_item['image'] = img_search.group(1)
               
                clean_description = re.sub(r'<.*?>', '', entry.description)
                news_item['description'] = clean_description[:300] + '...'

            news_items.append(news_item)

    return jsonify(news_items)

if __name__ == '__main__':
    app.run(debug=True)
