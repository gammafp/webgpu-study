import { createRouter, createWebHistory } from "vue-router";
import FirstTriangle1 from "@/views/start/1-triangle/FirstTriangle1.vue";
import Points from "@/views/start/2-points/Points.vue";
import LinesStrip from "@/views/start/3-lines-strip/LinesStrip.vue";
import TriangleStrip from "@/views/start/4-triangle-strip/TriangleStrip.vue";

import TriangleColored from "@/views/buffers/1-triangle-colored/TriangleColored.vue";
import TriangleColoredUniqueBuffer from '@/views/buffers/2-triangle-colored-unique-buffer/TriangleColoredUniqueBuffer.vue';
import FirstQuad from "@/views/buffers/3-first-quad/FirstQuad.vue";
import QuadWithIndex from "@/views/buffers/4-quad-with-index/QuadWithIndex.vue";

import Transforms from "@/views/transformations/1-transforms/Transforms.vue";


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
        },
        {
            path: "/triangle-colored-unique-buffer",
            name: "triangle-colored-unique-buffer",
            component: TriangleColoredUniqueBuffer
        },
        {
            path: "/first-quad",
            name: "first-quad",
            component: FirstQuad
        },
        {
            path: "/quad-with-index",
            name: "quad-with-index",
            component: QuadWithIndex
        },
        {
            path: "/transforms",
            name: "transforms",
            component: Transforms
        }
    ],
});

export default router;

