import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import "../styles/Bible.css";

const API_KEY = "9a8c2b0a20ea36de9f5cb33e71844243";
const BIBLE_VERSIONS = [
  { id: "9879dbb7cfe39e4d-01", name: "KJV" },
  { id: "06125adad2d5898a-01", name: "ASV" },
  { id: "de4e12af7f28f599-01", name: "ESV" },
  { id: "1c9761e0230da6e0-01", name: "NIV" },
  { id: "c315fa9f71d4af3a-01", name: "NKJV" },
  { id: "7142879509583d59-01", name: "NLT" },
];

const Bible = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bibleVersion, setBibleVersion] = useState(BIBLE_VERSIONS[0]);

  useEffect(() => {
    fetchBooks();
  }, [bibleVersion]);

  useEffect(() => {
    if (selectedBook) {
      fetchChapters();
    }
  }, [selectedBook, bibleVersion]);

  useEffect(() => {
    if (selectedBook && selectedChapter) {
      fetchVerses();
    }
  }, [selectedBook, selectedChapter, bibleVersion]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${bibleVersion.id}/books`,
        {
          headers: {
            "api-key": API_KEY,
          },
        }
      );
      const data = await response.json();
      setBooks(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  const fetchChapters = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${bibleVersion.id}/books/${selectedBook}/chapters`,
        {
          headers: {
            "api-key": API_KEY,
          },
        }
      );
      const data = await response.json();
      setChapters(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setLoading(false);
    }
  };

  const fetchVerses = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.scripture.api.bible/v1/bibles/${bibleVersion.id}/chapters/${selectedChapter}/verses`,
        {
          headers: {
            "api-key": API_KEY,
          },
        }
      );
      const data = await response.json();

      // Fetch content for each verse
      const versesWithContent = await Promise.all(
        data.data.map(async (verse) => {
          const verseContent = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${bibleVersion.id}/verses/${verse.id}`,
            {
              headers: {
                "api-key": API_KEY,
              },
            }
          );
          const verseData = await verseContent.json();
          return {
            ...verse,
            content: verseData.data.content,
          };
        })
      );

      setVerses(versesWithContent);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching verses:", error);
      setLoading(false);
    }
  };

  const scrollToVerse = (verseId) => {
    const element = document.getElementById(verseId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const DefaultContent = () => (
    <div className="default-content">
      <Typography variant="h3" className="welcome-title">
        Welcome to the Bible
      </Typography>
      <Typography variant="h6" className="welcome-subtitle">
        Select a book and chapter above to begin reading
      </Typography>
      <div className="welcome-icon">📖</div>
    </div>
  );

  return (
    <div className="bible-container">
      <Container maxWidth="xl" className="bible-content">
        <Typography variant="h2" className="bible-title">
          Explore the <span className="highlight">Bible</span>
        </Typography>

        <div className="bible-header">
          <div className="bible-controls">
            <Select
              value={selectedBook}
              onChange={(e) => {
                setSelectedBook(e.target.value);
                setSelectedChapter("");
                setVerses([]);
              }}
              className="bible-select"
              displayEmpty
              renderValue={selectedBook ? undefined : () => "Select Book"}
            >
              {books.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                  {book.name}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={selectedChapter}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                setVerses([]);
              }}
              disabled={!selectedBook}
              className="bible-select"
              displayEmpty
              renderValue={selectedChapter ? undefined : () => "Select Chapter"}
            >
              {chapters.map((chapter) => (
                <MenuItem key={chapter.id} value={chapter.id}>
                  Chapter {chapter.number}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={bibleVersion.id}
              onChange={(e) => {
                const newVersion = BIBLE_VERSIONS.find(
                  (v) => v.id === e.target.value
                );
                setBibleVersion(newVersion);
                setVerses([]);
              }}
              className="bible-select version-select"
            >
              {BIBLE_VERSIONS.map((version) => (
                <MenuItem key={version.id} value={version.id}>
                  {version.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="verses-container">
          {loading ? (
            <div className="loading-container">
              <CircularProgress />
              <Typography>Loading scripture...</Typography>
            </div>
          ) : verses.length > 0 ? (
            <>
              <Typography variant="h4" className="chapter-title">
                {books.find((b) => b.id === selectedBook)?.name}{" "}
                {selectedChapter.split(".").pop()}
              </Typography>
              <div className="verses-content">
                {verses.map((verse) => (
                  <span key={verse.id} id={verse.id} className="verse-wrapper">
                    <span className="verse-number">
                      {verse.reference.split(" ").pop()}
                    </span>
                    <span
                      className="verse-text"
                      dangerouslySetInnerHTML={{
                        __html: verse.content.replace(/^\d+\s*/, ""),
                      }}
                    />
                  </span>
                ))}
              </div>
            </>
          ) : (
            <DefaultContent />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Bible;
