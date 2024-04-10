<template>
    <div>
        <h1>Compte</h1>
        <pre class="dev">
            {{  $adion.call.active }}
            <!-- {{  $adion.webrtc.sessions }} -->
        </pre>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .dev {
        background-color: #171717;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        overflow: auto;
        font-size: 14px;

    }
</style>