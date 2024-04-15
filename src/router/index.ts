import { createRouter, createWebHistory } from "vue-router";
import FirstTriangle1 from "@/views/start/1-triangle/FirstTriangle1.vue";
import Points from "@/views/start/2-points/Points.vue";
import LinesStrip from "@/views/start/3-lines-strip/LinesStrip.vue";
import TriangleStrip from "@/views/start/4-triangle-strip/TriangleStrip.vue";

import TriangleColored from "@/views/buffers/1-triangle-colored/TriangleColored.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "triangle",
            component: FirstTriangle1,
        },
        {
            path: "/points",
            name: "points",
            component: Points,
        },
        {
            path: "/lines-strip",
            name: "lines-strip",
            component: LinesStrip
        },
        {
            path: "/triangle-strip",
            name: "triangle-strip",
            component: TriangleStrip
        },
        {
            path: "/triangle-colored",
            name: "triangle-colored",
            component: TriangleColored
        }
    ],
});

export default router;

