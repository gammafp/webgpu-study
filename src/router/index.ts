import { createRouter, createWebHistory } from "vue-router";
import FirstTriangle1 from "../views/1-triangle/FirstTriangle1.vue";
import Points from "../views/2-points/Points.vue";
import LinesStrip from "@/views/3-lines-strip/LinesStrip.vue";
import TriangleStrip from "@/views/4-triangle-strip/TriangleStrip.vue";


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
        }
    ],
});

export default router;

