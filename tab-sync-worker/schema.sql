CREATE TABLE tabs (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    scroll_position INTEGER DEFAULT 0,
    timestamp INTEGER DEFAULT 0,
    window_id INTEGER NOT NULL
);