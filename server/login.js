import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";


dotenv.config();

const router = express.Router();

const supabase = 