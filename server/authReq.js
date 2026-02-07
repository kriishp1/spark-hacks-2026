import { supabase } from "../supaBaseClient.js";
export async function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader?.startWith("Bearer ")) {
            return res.status(401).json({error : "Not authenticated" });
        }

        const token = authHeader.split(" ")[1];

        const { data, error} = await supabase.auth.getUser(token);

        if(error || !data.user) {
            return res.status(401).json({error: "Invalid or Expired token"});
        }

        req.user = data.user;
        next();
    } catch (error) {
        return res.status(500).json({error: "Auth middleware error" })
    }
}

