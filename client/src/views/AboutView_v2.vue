<template>
  <div class="about-page container">
    <!-- Hero Section -->
    <section
      class="hero-section flex flex-column justify-content-between"
      v-scroll-reveal
    >
      <div class="text-section">
        <h1 class="title">About Us</h1>
        <p class="subtitle">
          We craft modern web experiences with passion, precision, and innovation.
        </p>

        <Button label="Contact Us" class="p-button-rounded p-button-lg mt-3" />
      </div>

      <img class="hero-image" src="https://front.satjapan.info/assets/images/new-bannars/homepage-5.webp" alt="Team image" />
    </section>

    <!-- Stats Section -->
    <section class="stats-section grid mt-6" v-scroll-reveal>
      <div class="col-12 md:col-3" v-for="stat in stats" :key="stat.label">
        <Card class="stat-card text-center">
          <h2 class="stat-number">{{ stat.number }}</h2>
          <p class="stat-label">{{ stat.label }}</p>
        </Card>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section mt-6" v-scroll-reveal>
      <h2 class="section-title">Meet the Team</h2>

      <div class="grid mt-3">
        <div class="col-12 md:col-3" v-for="member in team" :key="member.name">
          <Card class="team-card text-center hover-zoom">
            <Avatar :image="member.photo" size="xlarge" shape="circle" />
            <h3 class="mt-2">{{ member.name }}</h3>
            <p class="role">{{ member.role }}</p>

            <Divider />

            <div class="flex justify-content-center gap-2">
              <Chip v-for="skill in member.skills" :label="skill" class="p-mr-2" :key="skill" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { number: '10+', label: 'Years Experience' },
  { number: '120+', label: 'Projects Delivered' },
  { number: '50+', label: 'Happy Clients' },
]

const team = [
  {
    name: 'Alice Kim',
    role: 'Frontend Engineer',
    photo: '/assets/user1.jpg',
    skills: ['Vue', 'PrimeVue', 'UI/UX'],
  },
  {
    name: 'Daniel Stone',
    role: 'Backend Engineer',
    photo: '/assets/user2.jpg',
    skills: ['Node', 'SQL', 'APIs'],
  },
  {
    name: 'Maria Lopez',
    role: 'Product Designer',
    photo: '/assets/user3.jpg',
    skills: ['Figma', 'UX', 'Prototyping'],
  },
]
</script>

<style scoped>
/* ----------- HERO SECTION ----------- */
.hero-section {
  animation: fadeInUp 0.8s ease-out forwards;
}
.title {
  font-size: 2.8rem;
  font-weight: bold;
}
.subtitle {
  font-size: 1.2rem;
  color: #666;
}
.hero-image {
  max-width: 100%;
  animation: float 4s ease-in-out infinite;
}

/* ----------- CARDS ----------- */
.stat-card,
.team-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.hover-zoom:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
}
.stat-number {
  font-size: 2rem;
  font-weight: bold;
}
.stat-label {
  color: #777;
}

/* ----------- TITLES ----------- */
.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* ----------- ANIMATIONS ----------- */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}

/* ----------- SCROLL REVEAL ----------- */
[v-scroll-reveal] {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s ease-out;
}

[v-scroll-reveal].reveal-active {
  opacity: 1;
  transform: translateY(0);
}
</style>
