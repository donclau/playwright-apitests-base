# Usamos la imagen oficial de Playwright con Node.js ya instalado
FROM mcr.microsoft.com/playwright:v1.49.0-noble

# Instalar Java (Requerido para Allure Report)
RUN apt-get update && apt-get install -y default-jre && rm -rf /var/lib/apt/lists/*

# Crear y definir el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm ci

# Copiar el resto del código del proyecto
COPY . .

# Comando por defecto (correr los tests Smoke y generar el reporte Allure)
CMD npx playwright test --grep "@smoke" && npx allure generate allure-results -o allure-report --clean --single-file



