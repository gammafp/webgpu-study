<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div class="left">
        <header>
            <h3 class="title">WebGPU learn</h3>
            <div class="wrapper-links">
                <div class="text-center">
                    <h5>- Start -</h5>
                    <div class="border-bottom border-dark"></div>
                </div>
                <nav>
                    <RouterLink to="/">Triangle</RouterLink>
                    <RouterLink to="/points">Points</RouterLink>
                    <RouterLink to="/lines-strip">Lines and strips</RouterLink>
                    <RouterLink to="/triangle-strip">Triangles and strips</RouterLink>
                </nav>
                <div class="text-center">
                    <h5>- Buffers -</h5>
                </div>
                <nav>
                    <RouterLink to="/triangle-colored">Triangle Colored</RouterLink>
                    <RouterLink to="/triangle-colored-unique-buffer">Triangle Colored Unique Buffer</RouterLink>
                    <RouterLink to="/first-quad">First Quad</RouterLink>
                    <span class="ms-3">...</span>
                    <!-- <RouterLink to="/points">Points</RouterLink>
                    <RouterLink to="/lines-strip">Lines and strips</RouterLink>
                    <RouterLink to="/triangle-strip">Triangles and strips</RouterLink> -->
                </nav>
            </div>
        </header>
    </div>
    <div class="right">
        <div class="right-container">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
.title {
    text-align: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid salmon;
}

.left {
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100vh;
    /* outline: 1px solid red; */
    border-right: 1px solid salmon;
    background-color: var(--color-background);
    & header {
        margin-top: 1rem;
    }
    overflow-y: auto;
    /* scrollbar style */
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: var(--color-text);
        border-radius: 10px;
    }
    padding-bottom: 20px;
}

.right {
    padding: 1rem;
    width: calc(100% - 250px);
    height: 100vh;

    overflow: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.right-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.wrapper-links nav {
    display: flex;
    flex-direction: column;
    /* outline: 1px solid blue; */
}

nav a:nth-last-child(1) {
    margin-bottom: 1rem;
    border-bottom: 1px solid salmon;
}

nav a {
    padding: 1rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 5px 1rem;
    font-size: 12px;
}

nav a:first-of-type {
    border: 0;
}
</style>
