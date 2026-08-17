# 🌤️ Weather Motion

<p align="center">
  Uma experiência de previsão do tempo dinâmica, onde a interface se transforma de acordo com o clima e o período do dia.
</p>

<p align="center">
  <strong>React • TypeScript • Vite • Open-Meteo</strong>
</p>

---

## ✨ Sobre o projeto

O **Weather Motion** é uma aplicação de previsão do tempo desenvolvida com **React + TypeScript**.

Além de exibir as condições climáticas atuais de uma cidade, a aplicação adapta sua identidade visual automaticamente de acordo com o **clima** e o **período do dia**, criando diferentes atmosferas para dias ensolarados, noites limpas, chuva, tempestades, neve e tempo nublado.

Ao acessar a aplicação, o Weather Motion também pode utilizar a localização do dispositivo para mostrar automaticamente o clima da região do usuário.

## 🎨 Ilustrações

Todas as ilustrações e cenários utilizados no **Weather Motion** foram criados por mim especialmente para o projeto.

Os cenários possuem diferentes variações de acordo com a condição climática e o período do dia, incluindo:

- ☀️ Céu limpo
- ☁️ Nublado
- 🌧️ Chuva
- ⛈️ Tempestade
- ❄️ Neve
- 🌙 Variações noturnas

A proposta visual foi criar uma interface ilustrada e dinâmica, fazendo com que o cenário acompanhe as condições climáticas exibidas pela aplicação.

## 🖼️ Preview

<img width="1666" height="925" alt="Captura de Tela 2026-08-17 às 11 41 16" src="https://github.com/user-attachments/assets/710d6c50-bd06-4c98-bb81-3b7fd2fe33ab" />

<img width="1666" height="925" alt="Captura de Tela 2026-08-17 às 11 44 27" src="https://github.com/user-attachments/assets/c9aef55e-85ab-4046-bfe3-3eddd56e1b05" />

## 🌦️ Funcionalidades

* 📍 **Localização automática** utilizando a Geolocation API do navegador
* 🔎 **Busca por cidade** através da barra de pesquisa
* ⌨️ Pesquisa utilizando **Enter** ou o botão de busca
* 🌡️ Exibição das principais informações climáticas da cidade
* 🌅 Identificação automática entre **dia e noite**
* 🎨 Interface dinâmica e responsiva de acordo com as condições climáticas
* ⏳ Estado de carregamento durante as requisições
* ⚠️ Tratamento de erros para cidades não encontradas ou falhas na API
* 🏙️ Cidade padrão como fallback caso a localização não esteja disponível

### Temas climáticos

A aplicação possui diferentes cenários visuais para:

* ☀️ Céu limpo durante o dia
* 🌙 Céu limpo durante a noite
* ☁️ Tempo nublado
* 🌧️ Chuva
* ⛈️ Tempestade
* ❄️ Neve

Cada condição pode possuir variações visuais específicas para **dia e noite**.

## 🛠️ Tecnologias

| Tecnologia            | Utilização                                   |
| --------------------- | -------------------------------------------- |
| React 19              | Construção da interface                      |
| TypeScript            | Tipagem e maior segurança no desenvolvimento |
| Vite                  | Ambiente de desenvolvimento e build          |
| CSS Modules           | Estilização isolada dos componentes          |
| React Icons           | Ícones da interface                          |
| Open-Meteo            | Dados meteorológicos e geocodificação        |
| Geolocation API       | Localização do usuário                       |
| ESLint                | Padronização e qualidade do código           |

## 🚀 Como executar

### Pré-requisitos

Antes de começar, você precisa ter instalado:

* **Node.js 18+**
* **npm**

Nenhuma chave de API é necessária — a Open-Meteo é gratuita e não exige cadastro.

### 1. Clone o repositório

```bash
git clone SEU_LINK_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd weather-motion
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute o projeto

```bash
npm run dev
```

Depois, acesse o endereço exibido pelo Vite no terminal.

Normalmente:

```text
http://localhost:5173
```

## 🎨 Sistema de temas

O Weather Motion interpreta a condição retornada pela API e define um tema visual correspondente.

Exemplos:

```text
clear_day     → ☀️ Céu limpo durante o dia
clear_night   → 🌙 Céu limpo durante a noite
cloud         → ☁️ Nublado
rain          → 🌧️ Chuva
storm         → ⛈️ Tempestade
snow          → ❄️ Neve
```

Isso permite que o background acompanhe visualmente as condições meteorológicas da cidade pesquisada.


## 🌐 API

Os dados meteorológicos são fornecidos pela [Open-Meteo](https://open-meteo.com/), gratuita e sem necessidade de chave de API:

* **[Forecast API](https://open-meteo.com/en/docs)** — temperatura atual, umidade, código de condição climática (WMO) e mín/máx do dia.
* **[Geocoding API](https://open-meteo.com/en/docs/geocoding-api)** — resolve o nome da cidade pesquisada em coordenadas.
* **[BigDataCloud Reverse Geocoding](https://www.bigdatacloud.com/geocoding-apis/free-reverse-geocoding-to-city-api)** — resolve as coordenadas da geolocalização do navegador de volta num nome de cidade (best-effort; se falhar, exibe "Sua localização").

O código WMO retornado pela Forecast API é mapeado para ícone/descrição/tema visual em [`src/utils/weatherCode.ts`](src/utils/weatherCode.ts).

## 👩‍💻 Autora

Desenvolvido por **Carol**.

Projeto criado para praticar desenvolvimento frontend com **React, TypeScript, consumo de APIs, geolocalização e interfaces dinâmicas**.

---

<p align="center">
  ☀️ 🌧️ ☁️ 🌙
</p>

<p align="center">
  <strong>Weather Motion</strong> — o clima muda, a interface também.
</p>
