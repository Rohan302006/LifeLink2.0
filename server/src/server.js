import { env } from "./config/env.js"; // runs first: stops here if config is bad
import app from "./app.js";

app.listen(env.PORT, () => {
    console.log(`LifeLink server running on http://localhost:${env.PORT}`);
}); 