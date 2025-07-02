<template>
  <nav class="bottom-nav">
    <div
      v-for="item in navItems"
      :key="item.label"
      :class="['nav-item', { active: isActive(item) }]"
      @click="navigate(item)"
    >
      <span class="icon" v-html="item.icon"></span>
      <span class="label">{{ item.label }}</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavCustomer",
  data() {
    return {
      navItems: [
        {
          label: "Accueil",
          route: "/",
          icon: `<svg width="24" height="24" fill="none" stroke="#bfa89e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12L12 3l9 9"/><path d="M9 21V9h6v12"/></svg>`,
        },
        {
          label: "Menu",
          route: "/menu",
          icon: `<svg width="24" height="24" fill="none" stroke="#bfa89e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,
        },
        {
          label: "Panier",
          route: "/panier",
          icon: `<svg width="24" height="24" fill="none" stroke="#bfa89e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
        },
        {
          label: "Profil",
          route: "/profil",
          icon: `<svg width="24" height="24" fill="none" stroke="#bfa89e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M2 20c0-4 8-6 10-6s10 2 10 6"/></svg>`,
        },
      ],
    };
  },
  methods: {
    navigate(item) {
      this.$router.push(item.route);
    },
    isActive(item) {
      return this.$route.path === item.route;
    },
  },
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 64px;
  background: #3a2b25;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  border-top: 1px solid #231915;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #bfa89e;
  font-size: 0.95rem;
  cursor: pointer;
  flex: 1;
  transition: color 0.2s;
}
.nav-item .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
}
.nav-item.active,
.nav-item:hover {
  color: #fff;
}
.nav-item.active .icon svg,
.nav-item:hover .icon svg {
  stroke: #fff;
}
.label {
  font-size: 0.95rem;
  margin-top: 2px;
}
</style>
