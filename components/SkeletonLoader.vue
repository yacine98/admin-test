<template>
  <div class="skeleton-loader">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-paragraph"></div>
    <div class="skeleton skeleton-paragraph"></div>
  </div>
</template>

<style scoped>
.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton {
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}

.skeleton-title {
  width: 60%;
  height: 20px;
}

.skeleton-paragraph {
  width: 100%;
  height: 15px;
}

@keyframes shimmer {
  0% {
    background-color: #e0e0e0;
  }

  50% {
    background-color: #f0f0f0;
  }

  100% {
    background-color: #e0e0e0;
  }
}
</style>
