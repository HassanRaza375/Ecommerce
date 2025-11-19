<template>
  <div class="notfound-container">
    <div class="notfound-box">
      <h1 class="notfound-title">404</h1>
      <h2 class="notfound-subtitle">Page Not Found</h2>
      <p class="notfound-text">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <RouterLink to="/" class="notfound-btn"> Go Back Home </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* MAIN CONTAINER */
.notfound-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f6fa;
  padding: 20px;
}

/* BOX CONTENT */
.notfound-box {
  text-align: center;
  background: #ffffff;
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
}

/* BIG TITLE */
.notfound-title {
  font-size: 80px;
  font-weight: 800;
  color: #e63946;
  margin-bottom: 10px;
}

/* SUBTITLE */
.notfound-subtitle {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2d2d2d;
}

/* PARAGRAPH TEXT */
.notfound-text {
  font-size: 16px;
  color: #555;
  margin-bottom: 25px;
}

/* BUTTON */
.notfound-btn {
  display: inline-block;
  padding: 12px 28px;
  background: #2d6cdf;
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: 0.3s ease;
}

.notfound-btn:hover {
  background: #1d4fb8;
}
</style>
