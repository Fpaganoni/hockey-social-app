:root {
/_ Fondo y Primer Plano _/
/_ Gradiente para tema CLARO: tonos claros/pasteles _/
--background-gradient: linear-gradient(
to bottom right,
oklch(0.95 0.02 210),
/_ Azul muy claro _/ oklch(0.8 0.04 220),
/_ Azul claro medio _/ oklch(0.95 0.02 210) /_ Cian claro _/
);
--background: oklch(0.98 0.02 80); /_ Casi blanco, un toque cálido _/
--foreground: oklch(0.2 0.05 70); /_ Texto oscuro, cálido y legible _/
--card: oklch(1 0 0);
--card-foreground: var(--foreground);
--popover: var(--card);
--popover-foreground: var(--foreground);

/_ Colores Principales (Énfasis Cálido y Vivo) _/
--primary: oklch(0.55 0.2 65); /_ Naranja/Oro vibrante para botones _/
--primary-contrast: oklch(0.8 0.1 65);
--primary-foreground: oklch(0.95 0.05 60); /_ Texto muy claro y cálido _/
--turf: oklch(0.65 0.2 130);

--secondary: oklch(0.9 0.08 75); /_ Fondo secundario suave _/
--secondary-foreground: var(--foreground);

/_ grises _/
--gray-light-1: oklch(0.2 0.03 215);
--gray-light-2: oklch(0.4 0.04 210);
--gray-light-3: oklch(0.3 0.05 220);
--dark-gray-1: oklch(0.95 0.02 210);
--dark-gray-2: oklch(0.9 0.03 215);
--dark-gray-3: oklch(0.8 0.04 220);

--success: oklch(50.174% 0.12243 143.997);
--warning: oklch(48.21% 0.10411 68.013);
--info: oklch(47.162% 0.12006 249.177);

/_ Estados Muted y Accent _/
--muted: oklch(0.95 0.03 85);
--muted-foreground: oklch(0.45 0.08 70); /_ Gris-marrón sutil _/
--accent: oklch(0.9 0.08 75);
--accent-foreground: var(--primary);

/_ Alertas (Tonos más fríos para contraste de significado) _/
--destructive: oklch(0.6 0.2 25); /_ Rojo _/
--destructive-foreground: oklch(1 0 0);

/_ Borde e Input _/
--border: oklch(0.85 0.05 80);
--input: oklch(0.85 0.05 80);
--ring: oklch(0.6 0.15 70); /_ Anillo de enfoque cálido _/

/_ Colores de Gráficos (Ajustados para calidez) _/
--chart-1: oklch(0.65 0.2 60); /_ Naranja _/
--chart-2: oklch(0.55 0.15 90); /_ Amarillo-Verdoso cálido _/
--chart-3: oklch(0.4 0.1 30); /_ Terracota oscuro _/
--chart-4: oklch(0.7 0.18 50); /_ Melocotón _/
--chart-5: oklch(0.5 0.25 40); /_ Rojo-Naranja profundo _/

/_ Sidebar (Separado para estructura) _/
--sidebar: oklch(0.95 0.03 85);
--sidebar-foreground: var(--foreground);
--sidebar-primary: var(--primary);
--sidebar-primary-foreground: var(--primary-foreground);
--sidebar-accent: var(--accent);
--sidebar-accent-foreground: var(--accent-foreground);
--sidebar-border: var(--border);
--sidebar-ring: var(--ring);

--radius: 0.625rem;
}

.dark {
/_ Fondo y Primer Plano _/
/_ Gradiente para tema OSCURO: tonos oscuros profundos _/
--background-gradient: linear-gradient(
to top left,
oklch(0.3 0.05 220),
/_ Cian oscuro _/ oklch(0.4 0.04 210),
/_ Azul muy oscuro _/ oklch(0.3 0.05 220) /_ Azul oscuro medio _/
);

--background: oklch(0.18 0.03 70); /_ Fondo muy oscuro y cálido _/
--foreground: oklch(0.9 0.03 80); /_ Texto claro, ligeramente cálido _/
--card: oklch(0.25 0.03 70);
--card-foreground: var(--foreground);
--popover: var(--card);
--popover-foreground: var(--foreground);

/_ Colores Principales (Énfasis Cálido y Sutil) _/
--primary: oklch(0.8 0.1 65); /_ Color primario claro y cálido _/
--primary-contrast: oklch(0.55 0.2 65);
--primary-foreground: oklch(0.15 0.05 70); /_ Texto oscuro para contraste _/
--turf: oklch(0.35 0.1 130);
--secondary: oklch(0.3 0.04 70); /_ Fondo secundario oscuro y sutil _/
--secondary-foreground: var(--foreground);

/_ grises _/
--dark-gray-1: oklch(0.2 0.03 215);
--dark-gray-2: oklch(0.4 0.04 210);
--dark-gray-3: oklch(0.3 0.05 220);
--gray-light-1: oklch(0.95 0.02 210);
--gray-light-2: oklch(0.9 0.03 215);
--gray-light-3: oklch(0.8 0.04 220);

--success: oklch(62.486% 0.1578 143.936);
--warning: oklch(77.025% 0.17409 64.047);
--info: oklch(65.817% 0.16904 248.834);

/_ Estados Muted y Accent _/
--muted: oklch(0.3 0.04 70);
--muted-foreground: oklch(0.7 0.08 75); /_ Texto gris claro, cálido _/
--accent: oklch(0.3 0.04 70);
--accent-foreground: var(--primary);

/_ Alertas (Tonos oscuros, menos brillantes) _/
--destructive: oklch(0.5 0.15 25);
--destructive-foreground: oklch(0.9 0.05 70);

/_ Borde e Input _/
--border: oklch(0.35 0.05 70);
--input: oklch(0.3 0.04 70);
--ring: oklch(0.5 0.1 70); /_ Anillo de enfoque sutil _/

/_ Colores de Gráficos (Oscuros y armoniosos) _/
--chart-1: oklch(0.4 0.15 60);
--chart-2: oklch(0.35 0.1 90);
--chart-3: oklch(0.55 0.08 30);
--chart-4: oklch(0.45 0.12 50);
--chart-5: oklch(0.3 0.18 40);

/_ Sidebar _/
--sidebar: oklch(0.2 0.03 75);
--sidebar-foreground: var(--foreground);
--sidebar-primary: var(--primary);
--sidebar-primary-foreground: var(--primary-foreground);
--sidebar-accent: var(--accent);
--sidebar-accent-foreground: var(--accent-foreground);
--sidebar-border: var(--border);
--sidebar-ring: var(--ring);
}

@theme inline {
--color-primary: #18283e;

--color-primary-light: #1f3a52;
--color-accent: #4caf50;
--color-accent-bright: #b1e4e4;
--color-accent-dark: #2e7d32;
--color-background: #18283e;
--color-surface: #1f3a52;
--color-surface-light: #243550;
--color-text: #ffffff;
--color-text-secondary: #a8b8c8;
--color-border: #2a4066;

--color-error: #f44336;

--color-pending: #ff6f00;
--radius: 0.5rem;

--color-success: var(--success);
--color-warning: var(--warning);
--color-info: var(--info);

/_ Alias para Grises Claros _/
--color-gray-light-1: var(--gray-light-1);
--color-gray-light-2: var(--gray-light-2);
--color-gray-light-3: var(--gray-light-3);

/_ Alias para Grises Oscuros _/
--color-dark-gray-1: var(--dark-gray-1);
--color-dark-gray-2: var(--dark-gray-2);
--color-dark-gray-3: var(--dark-gray-3);

--font-sans: "Inter", "Roboto", system-ui, sans-serif;
--font-mono: "Monaco", monospace;

--color-background: var(--background);
--color-background-gradient: var(--background-gradient);
--color-foreground: var(--foreground);
--color-card: var(--card);
--color-card-foreground: var(--card-foreground);
--color-popover: var(--popover);
--color-popover-foreground: var(--popover-foreground);
--color-primary: var(--primary);
--color-primary-contrast: var(--primary-contrast);
--color-primary-foreground: var(--primary-foreground);
--color-secondary: var(--secondary);
--color-secondary-foreground: var(--secondary-foreground);
--color-muted: var(--muted);
--color-muted-foreground: var(--muted-foreground);
--color-accent: var(--accent);
--color-accent-foreground: var(--accent-foreground);
--color-destructive: var(--destructive);
--color-destructive-foreground: var(--destructive-foreground);
--color-border: var(--border);
--color-input: var(--input);
--color-ring: var(--ring);
--color-chart-1: var(--chart-1);
--color-chart-2: var(--chart-2);
--color-chart-3: var(--chart-3);
--color-chart-4: var(--chart-4);
--color-chart-5: var(--chart-5);
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
--color-sidebar: var(--sidebar);
--color-sidebar-foreground: var(--sidebar-foreground);
--color-sidebar-primary: var(--sidebar-primary);
--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
--color-sidebar-accent: var(--sidebar-accent);
--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
--color-sidebar-border: var(--sidebar-border);
--color-sidebar-ring: var(--sidebar-ring);
--color-turf: var(--turf);
}

@layer base {

- {
  @apply border-border outline-ring/50;
  }
  body {
  background: var(--background-gradient);
  color: var(--foreground);
  }
  }

@layer utilities {
.bg-gradient-theme {
background: var(--background-gradient);
}
}

/_ Smooth transitions _/

- {
  @apply transition-colors duration-300 ease-in-out;
  }

button,
a {
@apply cursor-pointer;
}

/_ Scrollbar styling _/
::-webkit-scrollbar {
width: 8px;
height: 8px;
}

::-webkit-scrollbar-track {
background: var(--color-background);
}

::-webkit-scrollbar-thumb {
background: var(--color-primary);
border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
background: var(--color-primary);
}
