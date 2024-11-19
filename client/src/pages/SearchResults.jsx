import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Select, MenuItem, CircularProgress } from '@mui/material';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('de4e12af7f28f599-02');
  const [loading, setLoading] = useState(true);
  const API_KEY = '9a8c2b0a20ea36de9f5cb33e71844243';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setResults([]);

      try {
        // Get all books first
        const booksResponse = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/books`,
          {
            headers: {
              'api-key': API_KEY,
            },
          }
        );
        
        if (!booksResponse.ok) throw new Error('Failed to fetch books');
        const booksData = await booksResponse.json();

        // Parse the search query
        const searchParts = query.trim().split(' ');
        let bookName = '';
        let chapter = '';
        let verse = '';

        // Handle multi-word book names and chapter:verse references
        for (let i = 0; i < searchParts.length; i++) {
          const part = searchParts[i];
          if (part.includes(':')) {
            const [ch, vs] = part.split(':');
            chapter = ch;
            verse = vs;
            break;
          } else if (!isNaN(part)) {
            chapter = part;
            break;
          }
          bookName += (i > 0 ? ' ' : '') + part;
        }

        // Find matching book
        const matchingBook = booksData.data.find(book => 
          book.name.toLowerCase().includes(bookName.toLowerCase()) ||
          book.abbreviation.toLowerCase() === bookName.toLowerCase()
        );

        if (matchingBook) {
          if (verse) {
            // Fetch specific verse
            const verseResponse = await fetch(
              `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/verses/${matchingBook.id}.${chapter}.${verse}`,
              {
                headers: {
                  'api-key': API_KEY,
                },
              }
            );

            if (verseResponse.ok) {
              const verseData = await verseResponse.json();
              setResults([{
                reference: verseData.data.reference,
                version: bibleVersions[selectedVersion],
                text: verseData.data.content.replace(/<[^>]*>/g, ''),
                exact: true
              }]);
            }
          } else if (chapter) {
            // Fetch specific chapter
            const chapterResponse = await fetch(
              `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/chapters/${matchingBook.id}.${chapter}`,
              {
                headers: {
                  'api-key': API_KEY,
                },
              }
            );

            if (chapterResponse.ok) {
              const chapterData = await chapterResponse.json();
              // Create a single chapter result with parsed verses
              setResults([{
                reference: `${matchingBook.name} ${chapter}`,
                version: bibleVersions[selectedVersion],
                text: chapterData.data.content,
                exact: true,
                isChapter: true,
                verses: chapterData.data.content
                  .split(/(?=<verse)/)
                  .filter(v => v.trim())
                  .map(v => {
                    const verseMatch = v.match(/number="(\d+)".*?>(.*?)(?=<\/verse>|$)/s);
                    if (verseMatch) {
                      return {
                        number: verseMatch[1],
                        text: verseMatch[2].replace(/<[^>]*>/g, '').trim()
                      };
                    }
                    return null;
                  })
                  .filter(v => v)
              }]);
            }
          } else {
            // Fetch first chapter of the book
            const chaptersResponse = await fetch(
              `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/books/${matchingBook.id}/chapters`,
              {
                headers: {
                  'api-key': API_KEY,
                },
              }
            );

            if (chaptersResponse.ok) {
              const chaptersData = await chaptersResponse.json();
              const firstChapter = chaptersData.data[0];
              
              const chapterResponse = await fetch(
                `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/chapters/${firstChapter.id}`,
                {
                  headers: {
                    'api-key': API_KEY,
                  },
                }
              );

              if (chapterResponse.ok) {
                const chapterData = await chapterResponse.json();
                setResults([{
                  reference: chapterData.data.reference,
                  version: bibleVersions[selectedVersion],
                  text: chapterData.data.content.replace(/<[^>]*>/g, ''),
                  exact: true,
                  isChapter: true
                }]);
              }
            }
          }
        } else {
          // Perform general search if no exact match found
          const searchResponse = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/search?query=${encodeURIComponent(query)}&limit=25`,
            {
              headers: {
                'api-key': API_KEY,
              },
            }
          );

          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            const searchResults = searchData.data.verses.map(verse => ({
              reference: verse.reference,
              version: bibleVersions[selectedVersion],
              text: verse.text.replace(/<[^>]*>/g, ''),
              exact: false
            }));
            setResults(searchResults);
          }
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query, selectedVersion]);

  const bibleVersions = {
    'de4e12af7f28f599-02': 'NLT',
    '9879dbb7cfe39e4d-04': 'ESV',
    '01b29f4b342acc35-01': 'NIV',
    'de4e12af7f28f599-01': 'KJV'
  };

  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };

  return (
    <Container className="search-results-container">
      <Box className="search-header">
        <Typography variant="h4">
          Search results for: <em>{query}</em>
        </Typography>
        <Select
          value={selectedVersion}
          onChange={handleVersionChange}
          className="version-select"
        >
          <MenuItem value="de4e12af7f28f599-02">New Living Translation (NLT)</MenuItem>
          <MenuItem value="01b29f4b342acc35-01">New International Version (NIV)</MenuItem>
          <MenuItem value="9879dbb7cfe39e4d-04">English Standard Version (ESV)</MenuItem>
          <MenuItem value="de4e12af7f28f599-01">King James Version (KJV)</MenuItem>
        </Select>
      </Box>

      {loading ? (
        <Box className="loading-container">
          <CircularProgress />
          <Typography>Loading results...</Typography>
        </Box>
      ) : results.length > 0 ? (
        <Box className="results-list">
          {results.map((result, index) => (
            <Box 
              key={index} 
              className={`result-item ${result.exact ? 'exact-match' : ''}`}
              data-is-chapter={result.isChapter}
            >
              <Typography variant="h6" className="verse-reference">
                {result.reference} ({result.version})
                {result.exact && (
                  <span className="exact-match-badge">
                    {result.isChapter ? 'Chapter' : 'Exact Match'}
                  </span>
                )}
              </Typography>
              {result.isChapter && result.verses ? (
                <Box className="chapter-content">
                  {result.verses.map((verse, i) => (
                    <Box key={i} className="verse-item">
                      <span className="verse-number">{verse.number}</span>
                      <Typography component="div" className="verse-text">
                        {verse.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography className="verse-text">
                  {result.text}
                </Typography>
              )}
            </Box>
          ))}
          <Typography className="results-count">
            Found {results.length} results
          </Typography>
        </Box>
      ) : (
        <Typography className="no-results">
          No results found for "{query}"
        </Typography>
      )}
    </Container>
  );
};

export default SearchResults; 