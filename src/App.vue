<template>
  <div id="app">
    <div class="header">
      <img class="logo" src="assets/logo.png"/>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

:root {
  --color-Elementares_Gestalten: #E4E4E3;
  --color-Atelier: #E4E4E3;
  --color-Interfacedesign: #D1EBEB;
  --color-Kommunikationsdesign: #EAF2CF;
  --color-Produktdesign: #C9E1AD;
  --color-Theorie: #E4E4E3;
  --color-Werkstatt: #E4E4E3;
  --color-Projekte: #E4E4E3;


  --transition-default: 180ms ease-in;
}
  
#app {
  font-family: 'FHPSun-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 2.5rem;
  margin-bottom: 2.5rem;
}

.header{
  .logo {
    margin-top: 2.5rem;
    max-height: 5rem;
  }
}
</style>
