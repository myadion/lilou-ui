<template>
    <div class="debug">
        <h1>Debug</h1>
        <pre>{{ adion.search('') }}</pre>
    </div>
</template>

<script setup>
    import { useAdion } from '@/Adion'
    const adion = useAdion()
</script>

<style scoped>
    .debug {
        background-color: #171717e3;
        color: #fff;
        padding: 10px;
        overflow: auto;
        font-size: 14px;
        position: fixed;
        z-index: 9999;
        top: 0;
        right: 380px;
        left: 55px;
        bottom: 0;
    }
</style>