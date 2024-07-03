import "./bootstrap";
import "../css/app.css";

import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Navbar from "./Components/custom/navbar";
import Footer from "./Components/custom/footer";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        if (import.meta.env.DEV) {
            createRoot(el).render(
                <div>
                    <Navbar />
                    <App {...props} />
                    <Footer />
                </div>
            );
            return;
        }

        hydrateRoot(
            el,
            <div>
                <Navbar />
                <App {...props} />
                <Footer />
            </div>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
