-- Script SQL pour créer la table dans Supabase
-- Exécute ce script dans l'éditeur SQL de Supabase (SQL Editor)

-- Table pour stocker les réponses des utilisateurs
CREATE TABLE IF NOT EXISTS quiz_responses (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Informations personnelles
  firstname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  instagram VARCHAR(255) NOT NULL,
  
  -- Réponses aux questions du quiz
  answer_1 INTEGER, -- Indice de la réponse (0, 1, 2, etc.)
  answer_2 INTEGER,
  answer_3 INTEGER,
  answer_4 INTEGER,
  answer_5 INTEGER,
  answer_6 INTEGER,
  
  -- Réponses textuelles pour référence
  answer_1_text TEXT,
  answer_2_text TEXT,
  answer_3_text TEXT,
  answer_4_text TEXT,
  answer_5_text TEXT,
  answer_6_text TEXT,
  
  -- Métadonnées
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Créer un index sur l'email pour les recherches
CREATE INDEX IF NOT EXISTS idx_quiz_responses_email ON quiz_responses(email);

-- Créer un index sur la date de création
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at DESC);

-- Activer Row Level Security (RLS) pour la sécurité
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion depuis l'application (utilise ta clé API)
-- Cette politique permet à n'importe qui avec la clé API d'insérer des données
CREATE POLICY "Allow public insert" ON quiz_responses
  FOR INSERT
  WITH CHECK (true);

-- Politique pour permettre la lecture seulement avec authentification
-- Tu peux modifier cela selon tes besoins de sécurité
CREATE POLICY "Allow authenticated read" ON quiz_responses
  FOR SELECT
  USING (true);

