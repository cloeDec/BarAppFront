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

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

const router = useRouter();
const route = useRoute();

const navItems: NavItem[] = [
  {
    label: "Déconnexion",
    route: "/",
    icon: `<svg width="24" height="24" fill="none" stroke="#bfa89e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/><path d="M3 21V3a2 2 0 0 1 2-2h7"/></svg>`,
  },
  {
    label: "Commande",
    route: "/orderline",
    icon: `<svg width="24" height="24" fill="none" stroke="#bfa89e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`,
  },
  {
    label: "Panier",
    route: "/panier",
    icon: `<svg width="24" height="24" fill="none" stroke="#bfa89e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  },
  {
    label: "Carte",
    route: "/cocktails",
    icon: `<svg width="24" height="24" fill="none" stroke="#bfa89e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 3h18l-9 9-9-9z"/>
      <path d="M12 12v7"/>
      <path d="M8 21h8"/>
    </svg>`,
  },
];

const navigate = (item: NavItem) => {
  if (item.label === "Déconnexion") {
    localStorage.clear();
    router.push("/");
  } else {
    router.push(item.route).then(() => {
      window.location.reload();
    });
  }
};

const isActive = (item: NavItem) => {
  return route.path === item.route;
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
