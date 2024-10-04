import React, { useState, useEffect } from 'react';

const TemplateSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const templateContent = [
    {
      text: 'Hello Harish, Were thrilled to invite you to our upcoming webinar where our experts will dive deep into our latest features - Smart Ads & Concierge!  Date: 26th June, 2024   Time: 12:30 PM onwards  This insightful session will cover: ??Leveraging Smart Ads & Concierge for your business  ??Leveling up your marketing strategy with Smart Ads on Facebook & Instagram ??Understanding the difference between Smart Ads & Click to WhatsApp Ads ??And much more! Dont miss out on this opportunity to enhance your marketing game. Reserve your spot now!',
      type: 'body',
    },
  ];

  useEffect(() => {
    // Display all templateContent by default when component mounts
    setSearchResults(templateContent);
  }, []);

  const handleSearch = () => {
    const results = templateContent.filter((content) => {
      // Check if the entire text includes the search query exactly (case-insensitive)
      return content.text.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
    setSearchResults(results);
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <h3>{result.type}</h3>
                <p>{result.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching sentences found.</p>
        )}
      </div>
    </div>
  );
};

export default TemplateSearch;
