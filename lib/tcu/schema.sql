-- TCU Market Kitchen Terminal schema (MVP)

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  display_name TEXT,
  xp INTEGER DEFAULT 0,
  rank TEXT DEFAULT 'Cook'
);

CREATE TABLE charts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  src TEXT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trade_plans (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  plan JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE missions (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  xp_reward INTEGER
);

CREATE TABLE mission_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  mission_id TEXT REFERENCES missions(id),
  completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE characters (
  id TEXT PRIMARY KEY,
  name TEXT,
  role TEXT,
  emoji TEXT,
  desc TEXT
);

CREATE TABLE journal_entries (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  stripe_customer_id TEXT,
  active BOOLEAN DEFAULT FALSE
);

CREATE TABLE library_items (
  id TEXT PRIMARY KEY,
  title TEXT,
  body TEXT
);
